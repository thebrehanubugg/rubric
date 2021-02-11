$(document).ready(function() {
    let levelMessages = ["ex. Student tried to use correct grammar, spelling, and punctuation.", "ex. Student used mostly correct grammar, spelling, and punctuation.", "ex. Student used correct grammar, spelling, and punctuation.", "ex. Student used college-level grammar, spelling, and punctuation."];
    // const rows = prompt("How many rows will you have in your rubric?");
    const n_rows = Number(5);

    for(let n = 1; n < n_rows+1; n++) {
        let fieldset = $(`<fieldset class="my-8 border-2 border-solid border-black p-8" id="set${n}"></fieldset>`);
        let legend = $(`<legend>Row #${n}</legend>`);

        let criteriaDiv = $(`<div class="mb-4"></div>`);
        let criteriaNameLabel = $(`<label class="mr-4" for="criteria${n}Name"><span class="text-red-500 font-bold">*</span> Row Criteria Name</label>`);
        let criteriaName = $(`<input class="border-2 border-solid border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-black" type="text" name="criteria${n}Name" id="criteria${n}Name" placeholder="ex. Grammar" value="ABC" required />`);

        criteriaDiv.append(criteriaNameLabel);
        criteriaDiv.append(criteriaName);

        fieldset.append(legend);
        fieldset.append(criteriaDiv);

        let levelsDiv = $(`<div class="grid grid-cols-4"></div>`);

        for(let l = 1; l < 5; l++) {
            let levelDiv = $("<div></div>")
            let criteriaLevelLabel = $(`<label class="block text-sm font-medium text-gray-700" for="criteria${n}Level${l}"><span class="text-red-500 font-bold">*</span> Level ${l} Description</label>`);
            let criteriaLevel = $(`<input class="border-2 border-solid border-gray-300 px-4 py-2 rounded-lg outline-none focus:border-black" type="text" name="criteria${n}Level${l}" id="criteria${n}Level${l}" placeholder="${levelMessages[l-1]}" value="ABC" required />`);

            levelDiv.append(criteriaLevelLabel);
            levelDiv.append(criteriaLevel);

            levelsDiv.append(levelDiv);
        }

        fieldset.append(levelsDiv);
        $("#newRubric").append(fieldset);
    }

    $("#newRubric").append($(`<input class="bg-green-500 text-bold cursor-pointer px-8 py-4 rounded-lg text-white uppercase" type="submit" value="+ New Rubric" />`));
});