const fs = require('fs');
const path = require('path');

// Path to the CV repository
const { cvRepositoryPath } = require('../config');
const { defaultCVNames } = require('../config');

// function that could be used in the future to generate a new CV upon job creation, maybe using Overleaf API
const generateNewCV = async (companyName, version) => {
  try {
    // Construct the path to the CV file
    const cvFileName = defaultCVNames[version];
    if (!cvFileName) {
      throw new Error('Invalid CV version');
    }
    
    const cvFilePath = path.join(cvRepositoryPath, `${cvFileName}.pdf`);

    // Check if the CV file exists
    if (fs.existsSync(cvFilePath)) {
      console.log('CV file exists:', cvFilePath);
      // Logic to create the document (e.g., save it with a new name)
      // For simplicity, let's assume we are copying it to the downloads directory with a new name
      const newDocumentName = `CV_pierre_louis_nohet_${companyName}_${Date.now()}.pdf`;
      const newDocumentPath = path.join(__dirname, '..', '..', 'downloads', newDocumentName);

      // Copy the CV file with the new name
      fs.copyFileSync(cvFilePath, newDocumentPath);

      // Return the new document path or name
      return newDocumentName;
    } else {
      throw new Error('CV file not found');
    }
  } catch (error) {
    console.error('Error generating new CV:', error);
    // Handle the error accordingly
    throw error;
  }
};

const downloadCV = async (cvVersion, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
    const cvFileName = defaultCVNames[cvVersion];
  
    if (!cvFileName) {
      throw new Error('Invalid CV version');
    }

    const fileNamePdf = `${cvFileName}.pdf`;
    // Construct the path to the CV file
    // const cvFilePath = path.join(__dirname, '..', '..', 'cv-repository', filename);
    const cvFilePath = path.join(cvRepositoryPath, fileNamePdf);
    

    const fileNameDated = `${cvFileName}_${currentDate}.pdf`;
    console.log(cvFilePath);
     // Check if the file exists
     if (fs.existsSync(cvFilePath)) {
      // Set the appropriate headers for file download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${fileNameDated}`);

      // Create a read stream from the file and pipe it to the response object
      const fileStream = fs.createReadStream(cvFilePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: 'CV file not found' });
    }
  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { generateNewCV, downloadCV };
