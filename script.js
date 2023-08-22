(() => {
    const wrapper = document.getElementById('wrapperCanvas');
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    const count = 8
    const canvasBgColor = window.getComputedStyle(wrapper).backgroundColor;
    let centerX, centerY, radius, initialData;

    adaptiveCanvas()
    initialization()
    initialData = getRandomData(count)
    drawChart(initialData)

    window.addEventListener("resize", handleResize);

    canvas.addEventListener('click', () => {
        initialData = getRandomData(count);
        drawChart(initialData);
    });

    function initialization() {
        const padding = 10
        centerX = context.canvas.width / 2;
        centerY = context.canvas.height / 2;
        radius = Math.min(centerX, centerY) - padding;
    }

    function adaptiveCanvas() {
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.offsetHeight;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function getRandomData(numSectors) {
        const data = [];
        for (let i = 0; i < numSectors; i++) {
            const randomRadius = random(50, 100);
            const randomSection = random(1, 100);
            const color = getRandomColor();

            data.push({section: randomSection, radius: randomRadius, color});
        }
        return data;
    }

    function drawChart(data) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let startAngle = 0;
        const totalAngle = 2 * Math.PI;

        const totalData = data.reduce((accumulator, item) => accumulator + item.section, 0)

        data.forEach((item) => {
            const fractionAngle = (item.section / totalData) * totalAngle
            const endAngle = startAngle + fractionAngle;

            const radiusElement = (radius / 100) * item.radius
            //отрисовка секции на диаграмме
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radiusElement, startAngle, endAngle);
            context.fillStyle = item.color;
            context.fill();
            context.closePath();

            startAngle = endAngle;
        });

        const radiusCentralCircle = (radius / 100) * 20
        context.beginPath();
        context.arc(centerX, centerY, radiusCentralCircle, 0, totalAngle)
        context.fillStyle = canvasBgColor
        context.fill();
        context.closePath();
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[random(0, 15)];
        }
        return color;
    }

    function handleResize() {
        adaptiveCanvas();
        initialization();
        drawChart(initialData);
    }

})()