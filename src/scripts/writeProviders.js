var fs = require('fs');

fs.readFile('./src/IMAGE_DATA.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    arr = JSON.parse(data);
    arr.map(
        function(image, i) {
            image.versions = image.versions.map(
                function(version){
                    version.providers = [
                        {"id": "b3ba84e1-8979-4974-bfee-ace660ab9dd11", "name": "Cyverse Cloud - Marana", "code": "CYCM"},
                        { "id": "b3ba84e1-8979-4974-bfee-ace660ab9dd12", "name": "iPlant Workshop Cloud - Tucson", "code": "IWKT"}
                    ]
                    return version
                }
            )
            return image
        }
    )
    json = JSON.stringify(arr); //convert it back to json
    fs.writeFile('IMAGE_DATA.json', json, 'utf8', function(){console.log("success")}); // write it back 
}});