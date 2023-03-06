function tempFunction(data) {
    var baseURL = "https://world.openfoodfacts.org/api/v2/product/" + data;
    const userAction = async () => {
        const response = await fetch(baseURL);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return myJson;
    }
    // const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    // console.log(myJson);
    // return myJson;
    // };

    userAction().then(data => {
        hideElements();
        var servingSize = data.product.serving_quantity;
        var num = servingSize / 100;
        var carbs = data.product.nutriments.carbohydrates_100g;
        var energy = data.product.nutriments.energy_100g;
        var fat = data.product.nutriments.fat_100g;
        var proteins = data.product.nutriments.proteins_100g;
        var score = data.product.nutriscore_grade;
        var sodium = data.product.nutriments.sodium_100g;
        var imgURL = data.product.image_url;
        var productName = data.product.product_name_en;
        var sugars = data.product.nutriments.sugars;
        console.log(imgURL);
        document.getElementById("serving").innerHTML = "(" + servingSize + ")";
        document.getElementById("engy").innerHTML = Math.round(energy * num / 4.184) + " Calories";
        document.getElementById("carb").innerHTML = Math.round(carbs * num) + " Grams";
        document.getElementById("protein").innerHTML = Math.round(proteins * num) + " Grams";
        document.getElementById("fat").innerHTML = Math.round(fat * num) + " Grams";
        document.getElementById("soda").innerHTML = Math.round(sodium * num * 1000) + " Milligrams";
        document.getElementById("score").innerHTML = score;
        if ((window.innerWidth <= 1200) && (window.innerHeight <= 1000)) {
            document.getElementById("imgdiv").style.display = "none";
            document.getElementById("love").style.display = "none";
        }
        else {
            document.getElementById("imgdiv").style.display = "block";
            document.getElementById("img").src = imgURL;
        }
        document.getElementById("sugar").innerHTML = Math.round(sugars) + " Grams";
        document.getElementById("foot").innerHTML = footerResponse(fat, sodium, score);
        document.getElementById("header").innerHTML = productName;
        document.getElementById("table").style.display = "block";
        document.getElementById("img").style.display = "block";
        document.getElementById("readout").style.display = "block";
        document.getElementById('invis').innerText = document.getElementById("header").innerText + " has a serving size of " + document.getElementById("serving").innerText + " grams. The energy value that is provided is " + document.getElementById("engy").innerText + ". The amount of carbohydrates contained is " + document.getElementById("carb").innerText + ". The amount of protein contained is " + document.getElementById("protein").innerText + ". The amount of fat contained is " + document.getElementById("fat").innerText + ". The amount of sodium contained is " + document.getElementById("soda").innerText + ". The nutriscore of this food is " + document.getElementById("score").innerText + ". " + document.getElementById("foot").innerText;

    })

}

function hideElements() {
    document.getElementById("input").style.display = "none";
    document.getElementById("scan-button").style.display = "none";
    document.getElementById("enter-button").style.display = "none";
    document.getElementById("submit").style.display = "none";

}

function footerResponse(f, s, sc) {
    if (f > 10 || s > 500 || sc === "e" || sc === "d" || sc === "c") {
        return "This item is not recommended for children with diabetes or pre-diabetes";
    }
    else {
        document.getElementById("donate").style.display = "block";
        return "This item is safe to consume in moderation for children with diabetes or pre-diabetes";
    }
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
}

function redirect() {
    window.location.href = "https://www.capitalareafoodbank.org/how-to-help/donate-food/";
}

function enterBarcode() {
    document.getElementById("enter-button").style.display = "none";
    document.getElementById("scan-button").style.display = "none";
    document.getElementById("submit").style.display = "block";
    document.getElementById("input").style.display = "block";
}

function scanBarcode() {
    hideElements();
    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code scanned = ${decodedText}`, decodedResult);
        document.getElementById("qr-reader").style.display = "none";
        tempFunction(decodedText);
        html5QrcodeScanner.clear();
    }
    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", {
        fps: 10, qrbox: 300, useBarCodeDetectorIfSupported: true,
        showTorchButtonIfSupported: true,
    });
    html5QrcodeScanner.render(onScanSuccess);
}

function speak() {
    document.getElementById('speak').innerHTML = "Stop Speaking";

    let speech = new SpeechSynthesisUtterance();
    let combo = document.getElementsByClassName('goog-te-combo')[0];

    speech.lang = combo.value;
    console.log(combo.value);

    console.log(document.getElementById('invis').textContent);
    speech.text = document.getElementById('invis').textContent;
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        document.getElementById('speak').innerHTML = "Start Speaking";
    }
    else {
        window.speechSynthesis.speak(speech);
    }
}


        // var modal = document.getElementById("myModal");
        // var btn = document.getElementById("donate");
        // var span = document.getElementByClassName("close")[0];

        // btn.onclick = function () {
        //     modal.style.display = "block";
        // }

        // span.onClick = function () {
        //     modal.style.display = "none";
        // }

        // window.onclick = function (event) {
        //     if (event.target == modal) {
        //         modal.style.display = "none";
        //     }
        // }


