document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("tiradsForm").reset();
});

window.changeModifiersDisplay = function (idToChange) {
    let modifier = document.getElementById(idToChange);
    modifier.disabled = !modifier.disabled;
};

function blockUnblockCheckboxes(elementName, disable, checkFirstElement) {
    let form = document.getElementById("tiradsForm");
    let checkboxes = form.elements[elementName];

    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = disable;
        checkboxes[i].checked = false;
    }

    if (checkFirstElement) {
        checkboxes[0].checked = true;
    }
}

window.changeDisplay = function () {
    var noduleOptions = document.getElementsByName("nodule");
    for (var i = 0; i < noduleOptions.length; i++) {
        if (noduleOptions[i].checked) {
            switch (noduleOptions[i].value) {
                case "1":
                    blockUnblockCheckboxes("shape", true, false);
                    blockUnblockCheckboxes("margins", true, false);
                    blockUnblockCheckboxes("features", true, false);
                    blockUnblockCheckboxes("riskmodifiers", true, false);
                    break;
                case "2.1":
                    blockUnblockCheckboxes("shape", false, true);
                    blockUnblockCheckboxes("margins", false, true);
                    blockUnblockCheckboxes("features", true, false);
                    blockUnblockCheckboxes("riskmodifiers", true, false);
                    break;
                case "2.2":
                    blockUnblockCheckboxes("shape", true, false);
                    blockUnblockCheckboxes("margins", true, false);
                    blockUnblockCheckboxes("features", true, false);
                    blockUnblockCheckboxes("riskmodifiers", true, false);
                    break;
                case "3.1":
                    blockUnblockCheckboxes("shape", false, true);
                    blockUnblockCheckboxes("margins", false, true);
                    blockUnblockCheckboxes("features", false, false);
                    blockUnblockCheckboxes("riskmodifiers", false, false);
                    changeModifiersDisplay("features4");
                    break;
                case "3.2":
                    blockUnblockCheckboxes("shape", false, true);
                    blockUnblockCheckboxes("margins", false, true);
                    blockUnblockCheckboxes("features", false, false);
                    blockUnblockCheckboxes("riskmodifiers", false, false);
                    changeModifiersDisplay("features4");
                    break;
                case "4":
                    blockUnblockCheckboxes("shape", false, true);
                    blockUnblockCheckboxes("margins", false, true);
                    blockUnblockCheckboxes("features", false, false);
                    blockUnblockCheckboxes("riskmodifiers", false, false);
                    break;
                default:
                    break;
            }
            break;
        }
    }
};

window.calculateCategory = function () {
    let form = document.getElementById("tiradsForm");
    let nodule = parseFloat(form.elements["nodule"].value) || 0;
    let shape = parseInt(form.elements["shape"].value) || 0;
    let margins = parseInt(form.elements["margins"].value) || 0;

    let featuresElements = form.elements["features"];
    let featuresSum = 0;

    for (let i = 0; i < featuresElements.length; i++) {
        if (featuresElements[i].checked) {
            featuresSum += parseInt(featuresElements[i].value) || 0;
        }
    }
    let totalPoints = parseInt(nodule) + shape + margins + featuresSum;

    let category;
    if (totalPoints >= 5) {
        category = 5;
    } else if (totalPoints >= 4) {
        category = 4;
    } else if (totalPoints >= 3) {
        category = 3;
    } else if (totalPoints >= 2) {
        category = 2;
    } else {
        category = 1;
    }

    let modifiers = form.elements["riskmodifiers"];
    let noPositiveModifiers = 0;
    let noNegativeModifiers = 0;
    for (let i = 0; i < modifiers.length; i++) {
        if (modifiers[i].checked) {
            if (modifiers[i].value == "1") {
                noNegativeModifiers += 1;
            } else {
                noPositiveModifiers += 1;
            }
        }
    }

    modifyText(category, totalPoints, noPositiveModifiers, noNegativeModifiers);
};

function modifyText(category, totalPoints, noPositiveModifiers, noNegativeModifiers) {
    document.getElementById("tiradsCategory").innerText = category;
    document.getElementById("sum").innerText = totalPoints;

    var resultText = "";

    switch (category) {
        case 1:
            resultText =
                "Ryzyko złośliwości bliskie 0%.<br>BACC tarczycy niezalecana.<br>Kontrola USG w zależności od czynników ryzyka klinicznego.";
            break;
        case 2:
            resultText =
                "Ryzyko złośliwości bliskie 0%.<br>BACC tarczycy niezalecana.<br>Wyjątek: biopsja terapeutyczna u chorych objawowych, np. opróżnienie torbieli).<br>Kontrola USG w zależności od czynników ryzyka klinicznego.";
            break;
        case 3:
            resultText = "Niskie ryzyko złośliwości: 2–4%.<br>BACC tarczycy gdy ≥ 20 mm.";
            break;
        case 4:
            resultText = "Pośrednie ryzyko złośliwości 6–17%.<br>BACC tarczycy gdy ≥ 15 mm.";
            break;
        case 5:
            resultText = "Wysokie ryzyko złośliwości >26%.<br>BACC Tarczycy gdy ≥ 5 mm.";
            break;
        default:
            resultText = "Brak danych";
            break;
    }

    if (noPositiveModifiers != 0 || noNegativeModifiers != 0) {
        resultText += "<br>Wybrano ";
        switch (noPositiveModifiers) {
            case 0:
                break;
            case 1:
                resultText += `${noPositiveModifiers} cechę zmniejszającą ryzyko`;
                break;
            case 2:
            case 3:
            case 4:
                resultText += `${noPositiveModifiers} cechy zmniejszające ryzyko`;
                break;
            case 5:
                resultText += `${noPositiveModifiers} cech zmniejszających ryzyko`;
                break;
        }

        if (noPositiveModifiers > 0 && noNegativeModifiers > 0) {
            resultText += " i ";
        }

        switch (noNegativeModifiers) {
            case 0:
                break;
            case 1:
                resultText += `${noNegativeModifiers} cechę zwiększającą ryzyko`;
                break;
            case 2:
            case 3:
            case 4:
                resultText += `${noNegativeModifiers} cechy zwiększające ryzyko`;
                break;
            case 5:
                resultText += `${noNegativeModifiers} cech zwiększających ryzyko`;
                break;
        }

        if (noNegativeModifiers > 0) {
            resultText += "<br>Można rozważyć BACC przy mniejszym wymiarze zmiany.";
        }
    }

    resultText += "<br>BACC — biopsja aspiracyjna cienkoigłowa celowana";

    document.getElementById("result").innerHTML = resultText;
    document.getElementById("result").style.display = "block";
}
