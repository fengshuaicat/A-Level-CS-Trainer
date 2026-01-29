// js/questions/1_1.js
// 纯题目数据 + 标准答案 + 满分讲解（导师会原样使用）

window.ChapterQuestions = window.ChapterQuestions || {};

window.ChapterQuestions["1_1"] = window.ChapterQuestions["1.1"] = [
    {
        q: "Which number system do computers fundamentally use to represent data?",
        type: "mc",
        options: ["Decimal (base-10)", "Binary (base-2)", "Hexadecimal (base-16)", "Octal (base-8)"],
        ans: 1,
        marks: 1,
        explanation: "电脑只认识 0 和 1，所有数据最终都用二进制存储。\n(Computers only understand 0s and 1s — everything is stored in binary.)"
    },
    {
        q: "How many bytes are there in 1 kilobyte (KB)?",
        type: "fill",
        ans: ["1024"],
        marks: 1,
        explanation: "1 KB = 1024 bytes（不是1000！这是考试常考陷阱）\n(1 KB = 1024 bytes, not 1000 — common exam trap!)"
    },
    {
        q: "Convert decimal 45 to 8-bit binary.",
        type: "fill",
        ans: ["00101101"],
        marks: 1,
        explanation: "45 ÷ 2 = 22 余 1 → 22 ÷ 2 = 11 余 0 → ... → 最终结果 00101101\n(45 in binary is 101101, padded to 8 bits: 00101101)"
    },
    {
        q: "Match the compression techniques with their correct type:",
        type: "match",
        left: ["RLE", "JPEG", "Huffman coding", "LZW"],
        right: ["Lossy", "Lossless (run-length)", "Lossless (frequency-based)", "Lossless (dictionary)"],
        ans: [1, 0, 2, 3],
        marks: 4,
        explanation: "RLE → Lossless (repeating runs), JPEG → Lossy, Huffman → 按频率编码, LZW → 字典压缩（如 GIF）"
    },
    {
        q: "Explain what is meant by 'lossy compression'. Give one advantage and one disadvantage. (4 marks)",
        type: "long",
        marks: 4,
        modelAnswer: "Lossy compression discards less important data to achieve smaller file size (e.g. JPEG removes subtle colour details the eye can't notice). Advantage: much smaller files. Disadvantage: permanent quality loss.",
        explanation: "有损压缩会丢弃人眼不敏感的数据来大幅减小文件体积。\n优点：文件极小 缺点：质量永久损失，无法100%还原"
    },
    {
        q: "Write a Python function to convert a decimal number (0-255) to 8-bit binary string without using bin(). (6 marks)",
        type: "code",
        marks: 6,
        modelAnswer: `def dec_to_bin(n):\n    result = ""\n    for i in range(7, -1, -1):\n        if n >= 2**i:\n            result += "1"\n            n -= 2**i\n        else:\n            result += "0"\n    return result`,
        explanation: "核心思路：从高位到低位判断每一位是否需要减去 2^i\n(Loop from MSB to LSB, check if subtraction is needed)"
    }
    // 继续加满10题……
];