const generateMarks = (min, max, step) => {
    const marks = [];
    for (let i = min; i <= max; i += step) {
        marks.push({ value: i, label: i.toString() });
    }
    console.log("marks",marks)
    return marks;
};

const marks = generateMarks(0, 360, 50);
export default marks;
