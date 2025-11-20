const fs = require('fs');
const path = require('path');

const talks = [
    {
        title: 'The Future of JavaScript',
        speakers: ['Jane Doe'],
        categories: ['JavaScript', 'Web Development'],
        description: 'A look into the next features of JavaScript and how they will shape the future of web development.'
    },
    {
        title: 'CSS Grids and Flexbox: A Deep Dive',
        speakers: ['John Smith'],
        categories: ['CSS', 'Frontend'],
        description: 'Learn the ins and outs of CSS Grids and Flexbox to create complex and responsive layouts with ease.'
    },
    {
        title: 'Building Scalable APIs with Node.js',
        speakers: ['Peter Jones', 'Sue Williams'],
        categories: ['Node.js', 'Backend', 'API'],
        description: 'An in-depth guide to building scalable and maintainable APIs using Node.js and Express.'
    },
    {
        title: 'Introduction to Machine Learning with TensorFlow.js',
        speakers: ['Maria Garcia'],
        categories: ['Machine Learning', 'JavaScript', 'TensorFlow'],
        description: 'Discover how to build and train machine learning models in the browser with TensorFlow.js.'
    },
    {
        title: 'The Power of Serverless',
        speakers: ['David Miller'],
        categories: ['Serverless', 'Cloud', 'Architecture'],
        description: 'Explore the benefits of serverless architecture and how to build cost-effective and scalable applications.'
    },
    {
        title: 'WebAssembly: The Next Frontier',
        speakers: ['Chris Brown'],
        categories: ['WebAssembly', 'Performance'],
        description: 'An introduction to WebAssembly and how it can be used to run high-performance code in the browser.'
    }
];

const schedule = [];
let currentTime = new Date('2025-11-20T10:00:00');

const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
};

const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

talks.forEach((talk, index) => {
    const startTime = new Date(currentTime);
    const endTime = addMinutes(startTime, 60);

    schedule.push({
        ...talk,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        duration: 60,
    });

    currentTime = addMinutes(endTime, 10);

    if (index === 2) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = addMinutes(lunchStartTime, 60);
        schedule.push({
            isBreak: true,
            title: 'Lunch Break',
            startTime: formatTime(lunchStartTime),
            endTime: formatTime(lunchEndTime),
        });
        currentTime = lunchEndTime;
    }
});

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(distDir, 'schedule.json'), JSON.stringify(schedule, null, 4));


const templatePath = path.join(__dirname, 'src', 'template.html');
const stylePath = path.join(__dirname, 'src', 'style.css');
const scriptPath = path.join(__dirname, 'src', 'script.js');

let template = fs.readFileSync(templatePath, 'utf-8');
const style = fs.readFileSync(stylePath, 'utf-8');
let script = fs.readFileSync(scriptPath, 'utf-8');

// Replace the placeholder in the script with the actual data
script = script.replace(`fetch('schedule.json')
        .then(response => response.json())
        .then(data => {`, `
        const data = ${JSON.stringify(schedule, null, 4)};
        `);

template = template.replace('<style></style>', `<style>${style}</style>`);
template = template.replace('<script></script>', `<script>${script}</script>`);


fs.writeFileSync(path.join(distDir, 'index.html'), template);

console.log('Website built successfully!');
