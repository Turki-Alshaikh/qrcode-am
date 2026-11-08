const qrCode = new QRCodeStyling({
    width: 280, 
    height: 280,
    type: "svg", 
    data: "https://example.com",
    image: "",
    dotsOptions: {
        color: "#000000",
        type: "square"
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.4
    },
    qrOptions: {
        errorCorrectionLevel: "H" 
    },
    cornersSquareOptions: {
        type: "square",
        color: "#000000"
    },
    cornersDotOptions: {
        type: "square",
        color: "#000000"
    }
});

qrCode.append(document.getElementById("canvas"));

const urlInput = document.getElementById("urlInput");
const fgColor = document.getElementById("fgColor");
const bgColor = document.getElementById("bgColor");
const dotStyle = document.getElementById("dotStyle");
const logoInput = document.getElementById("logoInput");
const removeLogoBtn = document.getElementById("removeLogo");
const fileNameSpan = document.getElementById("fileName");
const downloadBtn = document.getElementById("downloadBtn");

const qrWidth = document.getElementById("qrWidth");
const qrHeight = document.getElementById("qrHeight");
const errorCorrection = document.getElementById("errorCorrection");
const toggleAdvancedBtn = document.getElementById("toggleAdvanced");
const advancedSettings = document.getElementById("advancedSettings");

let currentLogo = "";

function updateColorLabels() {
    fgColor.nextElementSibling.textContent = fgColor.value.toUpperCase();
    bgColor.nextElementSibling.textContent = bgColor.value.toUpperCase();
}

function updatePreview() {
    const dataUrl = urlInput.value || "https://example.com";
    updateColorLabels();
    
    let cornerStyle = "square";
    let cornerDotStyle = "square";
    if (dotStyle.value !== "square") {
        cornerStyle = "extra-rounded";
        cornerDotStyle = "dot";
    }

    qrCode.update({
        data: dataUrl,
        dotsOptions: {
            color: fgColor.value,
            type: dotStyle.value
        },
        backgroundOptions: {
            color: bgColor.value,
        },
        cornersSquareOptions: {
            type: cornerStyle,
            color: fgColor.value
        },
        cornersDotOptions: {
            type: cornerDotStyle,
            color: fgColor.value
        },
        qrOptions: {
            errorCorrectionLevel: errorCorrection.value
        },
        image: currentLogo
    });
}

[urlInput, fgColor, bgColor, dotStyle, errorCorrection].forEach(input => {
    input.addEventListener("input", updatePreview);
    input.addEventListener("change", updatePreview);
});

logoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
        removeLogoBtn.style.display = "block";
        const reader = new FileReader();
        reader.onload = (event) => {
            currentLogo = event.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
});

removeLogoBtn.addEventListener("click", () => {
    logoInput.value = "";
    currentLogo = "";
    fileNameSpan.textContent = "تصفح لرفع شعار...";
    removeLogoBtn.style.display = "none";
    updatePreview();
});

toggleAdvancedBtn.addEventListener("click", () => {
    advancedSettings.classList.toggle("open");
    toggleAdvancedBtn.classList.toggle("active");
});

downloadBtn.addEventListener("click", () => {
    const finalWidth = parseInt(qrWidth.value) || 2048;
    const finalHeight = parseInt(qrHeight.value) || 2048;

    qrCode.update({ width: finalWidth, height: finalHeight });
    
    // تم تغيير اسم الملف المحمل ليكون باسم المشروع الجديد
    qrCode.download({ name: "QRCODE_AM", extension: "png" }).then(() => {
        qrCode.update({ width: 280, height: 280 });
    });
});