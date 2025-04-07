document.addEventListener('DOMContentLoaded', function() {
	const btnGo = document.getElementById('btnGo');
	btnGo.addEventListener('click', function() {
		fetch(chrome.runtime.getURL('tnx.json'))
		.then(response => response.json())
		.then(jsonData => {
			name = document.getElementById('txtName').value
			var ul = "<ul>"
			for (const mechitzaItem of jsonData.mechitza) {
				for (const sefer of mechitzaItem.seforim) {
					seferName = sefer.name
					var _kapitel = 1
					for (const chapterTextList of sefer.text) {
						var _posuk = 1
						for (const textItem of chapterTextList) {
							if (textItem.substring(0,1) == name.substring(0,1) && textItem[textItem.length - 1] == name[name.length - 1]) {
								seferForDiv = getSeferAndPosuk(seferName, _kapitel, _posuk);
								ul += "<li>" + seferForDiv + "<br>" + textItem + "</li>"
							}
							_posuk ++;
						}
						_kapitel ++;
					}
				}
			}
			ul += "</ul>"
			document.getElementById('divResults').innerHTML = ul;
			document.getElementById('divResults').style.display = 'block';
		})
		.catch(error => console.error("Error fetching JSON:", error));
	});
});

function getSeferAndPosuk(seferName, _kapitel, _posuk) {
	return "<span class='sefer'>" + seferName + " " + num_to_heb(_kapitel) + ":" + num_to_heb(_posuk) + "</span>";
}

function num_to_heb(num) {
    var hundreds = (num / 100) * 100
    var tens = ((num % 100) / 10) * 10
    var digits = num % 10
    var heb = ""
    	if (hundreds == 100)
        heb = "ק"
    if (hundreds == 200)
        heb = "ר"
    if (hundreds == 300)
        heb = "ש"
    if (hundreds == 400)
        heb = "ת"
    
    if (tens == 10)
        heb += "י"
    if (tens == 20)
        heb += "כ"
    if (tens == 30)
        heb += "ל"
    if (tens == 40)
        heb += "מ"
    if (tens == 50)
        heb += "נ"
    if (tens == 60)
        heb += "ס"
    if (tens == 70)
        heb += "ע"
    if (tens == 80)
        heb += "פ"
    if (tens == 90)
        heb += "צ"

    if (digits == 1)
        heb += "א"
    if (digits == 2)
        heb += "ב"
    if (digits == 3)
        heb += "ג"
    if (digits == 4)
        heb += "ד"
    if (digits == 5)
        heb += "ה"
    if (digits == 6)
        heb += "ו"
    if (digits == 7)
        heb += "ז"
    if (digits == 8)
        heb += "ח"
    if (digits == 9)
        heb += "ט"

    return heb
}