// js/practice-data.js  —— 所有章节所有视频的专属练习题（集中管理，改这里就行！）
console.log("practice-data.js 加载成功！practiceData 已创建");
const practiceData = {
    // 格式： '章节ID_视频顺序': { title: "练习标题", questions: [...] }
    '1_1_0': {  // 1.1 章节第1个视频 (Binary Basics)
        title: "Binary Defusal Protocol",
        questions: [
            { type: "choice", q: "1010₂ = ?₁₀", a: "10", options: ["8", "10", "12", "15"], img: null },
            { type: "choice", q: "1111₂ = ?₁₀", a: "15", options: ["14", "15", "16", "17"], img: null },
            { type: "fill", q: "8位二进制最大值是______", a: "255", hint: "想想 11111111", img: null },
            { type: "choice", q: "下面哪个是16？", a: "10000", options: ["10000", "1111", "1010", "0110"], img: null },
            { type: "image", q: "这张图的二进制是多少？", a: "1100", img: "assets/practice-img/binary-1100.png", options: null } // 你可以放图片
        ]
    },
    '1_1_1': {  // 1.1 章节第2个视频 (Hexadecimal)
        title: "Hex Override Sequence",
        questions: [
            { type: "choice", q: "F₁₆ = ?₁₀", a: "15", options: ["14", "15", "16", "10"], img: null },
            { type: "fill", q: "FF₁₆ = ______₂", a: "11111111", hint: "8个1", img: null },
            { type: "choice", q: "CAFÉ₁₆ 第1位是？", a: "C", options: ["C", "A", "F", "E"], img: null },
            { type: "image", q: "图中十六进制是？", a: "DEAD", img: "assets/practice-img/hex-dead.png", options: null }
        ]
    },
    '1_1_2': {  // ASCII Encoding
        title: "ASCII Breach Attempt",
        questions: [
            { type: "choice", q: "ASCII 'A' = ?", a: "65", options: ["64", "65", "66", "97"], img: null },
            { type: "fill", q: "'!' 的 ASCII 是 ______", a: "33", hint: "键盘最左上", img: null },
            { type: "choice", q: "ASCII 90 是字母？", a: "Z", options: ["Y", "Z", "z", "a"], img: null }
        ]
    },
     '10_1_2': {  // Stack Operations & Concepts
    title: "Stack Mastery Check",
    questions: [
        {
            type: "choice",
            q: "Which of the following operation sequences will not leave the stack empty at the end? (starting from an empty stack)",
            a: "PUSH 5 → PUSH 8 → PUSH 3 → POP",
            options: [
                "PUSH 5 → PUSH 8 → POP → POP",
                "PUSH 5 → PUSH 8 → POP → PUSH 3 → POP → POP",
                "PUSH 5 → POP → PUSH 8 → POP",
                "PUSH 5 → PUSH 8 → PUSH 3 → POP"
            ],
            img: null
        },
        {
            type: "fill",
            q: "For a stack with capacity 5, starting with top = -1, after the operations: PUSH A → PUSH B → POP → PUSH C, the value of top is ______",
            a: "1",
            hint: "top points to the index of the top element; -1 means empty stack",
            img: null
        },
        {
            type: "choice",
            q: "Which of the following pseudocode snippets correctly implements the Push operation? (assuming capacity = 10)",
            a: "IF top = 9 THEN \"Stack full\" ELSE top ← top + 1, stack[top] ← item",
            options: [
                "IF top < 9 THEN top ← top + 1, stack[top] ← item",
                "IF top = 9 THEN \"Stack full\" ELSE top ← top + 1, stack[top] ← item",
                "top ← top + 1, stack[top] ← item",
                "IF top = -1 THEN top ← 0, stack[top] ← item ELSE top ← top + 1, stack[top] ← item"
            ],
            img: null
        }
    ]
}

    // 你以后加新视频练习，就在这里继续加 '1_2_0': { ... } 超级简单！
};

window.practiceData = practiceData;