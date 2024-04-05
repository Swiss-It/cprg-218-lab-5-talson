window.onload = () => {
    const launchInfoDiv = document.getElementById('launch-info');
    const selectDropdown = document.getElementById('api-endpoint-select');
    let selectedIndex = 0;

    //get latest launch
    fetch('https://api.spacexdata.com/v5/launches/latest')
        .then(response => response.json())
        .then(data => {
            const nextLaunch = data.launchpad; // Assuming you want the next launch
            console.log(data)
            console.log(nextLaunch)

            //get launchpad from latest launch
            return fetch('https://api.spacexdata.com/v4/launchpads/'+ nextLaunch)
            
        })
        //using the launchpad id, we catch the response
        .then(response => response.json())
        .then(launchPadData => {
            const launchPad = launchPadData.full_name;
            console.log(launchPad)

            const header2 = document.createElement('h2')
            header2.innerHTML = launchPad
            header2.classList.add("card")
            launchInfoDiv.appendChild(header2);

            let rocketId = "No Rockets";
            if(launchPadData.rockets.length > 0) {
                //we do have a rocket

                //rocket id
                rocketId = launchPadData.rockets[0];

                return fetch('https://api.spacexdata.com/v4/rockets/' + rocketId)
            }

            //no rockets
            const header3 = document.createElement('h3')
            header3.innerHTML = rocketId
            launchInfoDiv.appendChild(header3);
        
            
            return
        })
        .then(response => response.json())
        .then(rocketData => {
            console.log(rocketData.name)

            const header3 = document.createElement('h3')
            header3.innerHTML = rocketData.name
            header3.classList.add("card")
            launchInfoDiv.appendChild(header3);

            
            let image = document.createElement('img');
            let initialImageSrc = rocketData.flickr_images[selectedIndex];
            image.src = initialImageSrc;
            image.classList.add("card");
            launchInfoDiv.appendChild(image);

            selectDropdown.addEventListener('change', () => {
                // Get the selected option's value
                selectedIndex = selectDropdown.value; // Update selectedIndex when the selection changes
                
                let imageSrc = rocketData.flickr_images[selectedIndex];
                
                // Update the image source
                image.src = imageSrc;
            });

        })
        .catch(error => console.error('Error fetching data:', error));
};