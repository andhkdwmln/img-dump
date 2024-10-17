const fetch = require('node-fetch');

class Dumper {

    constructor () {

        this.url = 'https://mahasiswa.undiksha.ac.id';

    }

    async dump_data () {
        try {
            const result = [];
    
            for (let id = 1; id <= 8; id++) {
                const req = await fetch(this.url + '/data/search?fakultas=' + id);
                const res = await req.text();
    
                // Regex patterns for names and image URLs
                const nameRegex = /<h5 class="no-margin">([^<]+)<\/h5>/g;
                const imageRegex = /<img src="([^"]+)" class="img-rounded img-xs" alt="">/g;
    
                let nameMatches;
                let imageMatches;
    
                // Use a loop to extract names and image URLs
                while ((nameMatches = nameRegex.exec(res)) !== null) {
                    if ((imageMatches = imageRegex.exec(res)) !== null) {
                        const imageUrl = imageMatches[1];
    
                        // Check if the image URL starts with the desired prefix
                        if (imageUrl.startsWith("http://static1.undiksha.ac.id/")) {
                            result.push({
                                name: nameMatches[1],
                                imageUrl: imageUrl
                            });
                        }
                    }
                }
            }
    
            return result;
    
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }
    

}

module.exports = Dumper;