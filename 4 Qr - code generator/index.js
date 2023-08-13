// Project QR Code Generator
// Require packages to start with
// 1. inquirer - take input on command line
// 2. qr-image - to generate images
// 3. filesystem - to save the qr image in local directory

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Enter the link: ",
            name: "URL"
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        let qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream('qr_1.png'));

        // saving all the user inputs in a text file
        fs.writeFile("user_input.txt", url, function(error) {
            if(error) throw error;
            console.log("Input stored in history");
        })

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Unable to use promt at the time");
        } else {
            console.log("Some error occured");
        }
    });

