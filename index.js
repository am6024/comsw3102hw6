const qr = require('qr-image');  
const fs = require('fs');

async function generateQR() {
  try {
    const inquirer = await import('inquirer');
    const answers = await inquirer.default.prompt([
      {
        message: "Enter a URL:",
        name: "url",
      },
    ]);

    const url = answers.url;
    const qr_img = qr.image(url);
    const qr_gen= fs.createWriteStream('qr_code.png');

    qr_img.pipe(qr_gen);

    await saveURL(url);
    console.log('Success!');
  } catch (error) {
    console.error("Error:", error);
  }
}

function saveURL(url) {
  return new Promise((resolve, reject) => {
    fs.writeFile('URL.txt', url, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

generateQR();