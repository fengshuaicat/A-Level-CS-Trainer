// js/data.js —— 完整版（所有 20 个大章、44 个子章节，已全部补全，包括 14~20）
const chaptersData = [
    // ==================== AS Level ====================
    {
        id: "1_1",
        title: "1 Information representation",
        cards: [
            { title: "1.1 Data Representation", desc: "Binary, hexadecimal, number bases, ASCII, Unicode", video: "openVideoWindow('1_1')", note: "openNoteWindow('1_1')", coach: "openCoachWindow('1_1')", game: "openWindow('game-1_1','解密游戏 - 数据表示','games/web-desktop/practice.html')", feynman: "openFeynman('1_1')" },
            { title: "1.2 Multimedia – Graphics, Sound", desc: "Bitmap vs vector, colour depth, sampling rate, sound representation", video: "openVideoWindow('1_2')", note: "openNoteWindow('1_2')", coach: "openCoachWindow('1_2')", game: "alert('多媒体互动游戏开发中~')", feynman: "openFeynman('1_2')" },
            { title: "1.3 Compression", desc: "Lossy vs lossless, RLE, dictionary-based compression", video: "openVideoWindow('1_3')", note: "openNoteWindow('1_3')", coach: "openCoachWindow('1_3')", game: "alert('压缩算法互动游戏开发中~')", feynman: "openFeynman('1_3')" }
        ]
    },
    {
        id: "2_1",
        title: "2 Communication",
        cards: [
            { title: "2.1 Networks including the internet", desc: "LAN/WAN, topologies, packet switching, IP, TCP/UDP, internet structure", video: "openVideoWindow('2_1')", note: "openNoteWindow('2_1')", coach: "openCoachWindow('2_1')", game: "alert('网络模拟游戏开发中~')", feynman: "openFeynman('2_1')" }
        ]
    },
    {
        id: "3_1",
        title: "3 Hardware",
        cards: [
            { title: "3.1 Computers and their components", desc: "Von Neumann architecture, CPU, memory, I/O devices", video: "openVideoWindow('3_1')", note: "openNoteWindow('3_1')", coach: "openCoachWindow('3_1')", game: "alert('硬件组装模拟开发中~')", feynman: "openFeynman('3_1')" },
            { title: "3.2 Logic Gates and Logic Circuits", desc: "AND/OR/NOT/XOR, truth tables, half/full adders", video: "openVideoWindow('3_2')", note: "openNoteWindow('3_2')", coach: "openCoachWindow('3_2')", game: "alert('逻辑门电路搭建游戏开发中~')", feynman: "openFeynman('3_2')" }
        ]
    },
    {
        id: "4_1",
        title: "4 Processor Fundamentals",
        cards: [
            { title: "4.1 Central Processing Unit (CPU) Architecture", desc: "Registers, ALU, control unit, fetch-decode-execute cycle", video: "openVideoWindow('4_1')", note: "openNoteWindow('4_1')", coach: "openCoachWindow('4_1')", game: "alert('CPU 模拟器开发中~')", feynman: "openFeynman('4_1')" },
            { title: "4.2 Assembly Language", desc: "Low-level programming, mnemonics, addressing modes", video: "openVideoWindow('4_2')", note: "openNoteWindow('4_2')", coach: "openCoachWindow('4_2')", game: "alert('汇编编程游戏开发中~')", feynman: "openFeynman('4_2')" },
            { title: "4.3 Bit manipulation", desc: "Shifts, masks, bitwise operations", video: "openVideoWindow('4_3')", note: "openNoteWindow('4_3')", coach: "openCoachWindow('4_3')", game: "alert('位操作挑战开发中~')", feynman: "openFeynman('4_3')" }
        ]
    },
    {
        id: "5_1",
        title: "5 System Software",
        cards: [
            { title: "5.1 Operating Systems", desc: "Process management, memory management, scheduling", video: "openVideoWindow('5_1')", note: "openNoteWindow('5_1')", coach: "openCoachWindow('5_1')", game: "alert('OS 模拟开发中~')", feynman: "openFeynman('5_1')" },
            { title: "5.2 Language Translators", desc: "Assembler, compiler, interpreter", video: "openVideoWindow('5_2')", note: "openNoteWindow('5_2')", coach: "openCoachWindow('5_2')", game: "alert('翻译器互动开发中~')", feynman: "openFeynman('5_2')" }
        ]
    },
    {
        id: "6_1",
        title: "6 Security, privacy and data integrity",
        cards: [
            { title: "6.1 Data Security", desc: "Encryption, firewalls, malware", video: "openVideoWindow('6_1')", note: "openNoteWindow('6_1')", coach: "openCoachWindow('6_1')", game: "alert('安全攻防游戏开发中~')", feynman: "openFeynman('6_1')" },
            { title: "6.2 Data Integrity", desc: "Parity, checksum, validation", video: "openVideoWindow('6_2')", note: "openNoteWindow('6_2')", coach: "openCoachWindow('6_2')", game: "alert('校验游戏开发中~')", feynman: "openFeynman('6_2')" }
        ]
    },
    {
        id: "7_1",
        title: "7 Ethics and Ownership",
        cards: [
            { title: "7.1 Ethics and Ownership", desc: "Copyright, AI ethics, open source", video: "openVideoWindow('7_1')", note: "openNoteWindow('7_1')", coach: "openCoachWindow('7_1')", game: "alert('伦理案例讨论开发中~')", feynman: "openFeynman('7_1')" }
        ]
    },
    {
        id: "8_1",
        title: "8 Databases",
        cards: [
            { title: "8.1 Database Concepts", desc: "Entity, relationship, normalisation", video: "openVideoWindow('8_1')", note: "openNoteWindow('8_1')", coach: "openCoachWindow('8_1')", game: "alert('数据库设计游戏开发中~')", feynman: "openFeynman('8_1')" },
            { title: "8.2 Database Management Systems (DBMS)", desc: "SQL basics, client-server", video: "openVideoWindow('8_2')", note: "openNoteWindow('8_2')", coach: "openCoachWindow('8_2')", game: "alert('SQL 查询挑战开发中~')", feynman: "openFeynman('8_2')" },
            { title: "8.3 Data Definition Language (DDL) and Data Manipulation Language (DML)", desc: "CREATE, INSERT, SELECT, UPDATE", video: "openVideoWindow('8_3')", note: "openNoteWindow('8_3')", coach: "openCoachWindow('8_3')", game: "alert('SQL 实战开发中~')", feynman: "openFeynman('8_3')" }
        ]
    },
    {
        id: "9_1",
        title: "9 Algorithm Design and Problem-solving",
        cards: [
            { title: "9.1 Computational Thinking Skills", desc: "Abstraction, decomposition, algorithmic thinking", video: "openVideoWindow('9_1')", note: "openNoteWindow('9_1')", coach: "openCoachWindow('9_1')", game: "alert('计算思维游戏开发中~')", feynman: "openFeynman('9_1')" },
            { title: "9.2 Algorithms", desc: "Linear search, bubble sort, etc.", video: "openVideoWindow('9_2')", note: "openNoteWindow('9_2')", coach: "openCoachWindow('9_2')", game: "alert('排序算法可视化开发中~')", feynman: "openFeynman('9_2')" }
        ]
    },
    {
        id: "10_1",
        title: "10 Data Types and Structures",
        cards: [
            { title: "10.1 Data Types and Records", desc: "Primitive types, records", video: "openVideoWindow('10_1')", note: "openNoteWindow('10_1')", coach: "openCoachWindow('10_1')", game: "alert('数据类型练习开发中~')", feynman: "openFeynman('10_1')" },
            { title: "10.2 Arrays", desc: "1D/2D arrays, traversal", video: "openVideoWindow('10_2')", note: "openNoteWindow('10_2')", coach: "openCoachWindow('10_2')", game: "alert('数组操作游戏开发中~')", feynman: "openFeynman('10_2')" },
            { title: "10.3 Files", desc: "Text/binary files, file handling", video: "openVideoWindow('10_3')", note: "openNoteWindow('10_3')", coach: "openCoachWindow('10_3')", game: "alert('文件读写模拟开发中~')", feynman: "openFeynman('10_3')" },
            { title: "10.4 Introduction to Abstract Data Types (ADT)", desc: "Stack, queue, linked list basics", video: "openVideoWindow('10_4')", note: "openNoteWindow('10_4')", coach: "openCoachWindow('10_4')", game: "alert('ADT 可视化开发中~')", feynman: "openFeynman('10_4')" }
        ]
    },
    {
        id: "11_1",
        title: "11 Programming",
        cards: [
            { title: "11.1 Programming Basics", desc: "Variables, constants, identifiers", video: "openVideoWindow('11_1')", note: "openNoteWindow('11_1')", coach: "openCoachWindow('11_1')", game: "alert('编程入门游戏开发中~')", feynman: "openFeynman('11_1')" },
            { title: "11.2 Constructs", desc: "Sequence, selection, iteration", video: "openVideoWindow('11_2')", note: "openNoteWindow('11_2')", coach: "openCoachWindow('11_2')", game: "alert('控制结构练习开发中~')", feynman: "openFeynman('11_2')" },
            { title: "11.3 Structured Programming", desc: "Procedures, functions, parameters", video: "openVideoWindow('11_3')", note: "openNoteWindow('11_3')", coach: "openCoachWindow('11_3')", game: "alert('结构化编程挑战开发中~')", feynman: "openFeynman('11_3')" }
        ]
    },
    {
        id: "12_1",
        title: "12 Software Development",
        cards: [
            { title: "12.1 Program Development Life cycle", desc: "Analysis, design, implementation, testing, maintenance", video: "openVideoWindow('12_1')", note: "openNoteWindow('12_1')", coach: "openCoachWindow('12_1')", game: "alert('软件生命周期模拟开发中~')", feynman: "openFeynman('12_1')" },
            { title: "12.2 Program Design", desc: "Flowcharts, pseudocode", video: "openVideoWindow('12_2')", note: "openNoteWindow('12_2')", coach: "openCoachWindow('12_2')", game: "alert('程序设计工具开发中~')", feynman: "openFeynman('12_2')" },
            { title: "12.3 Program Testing and Maintenance", desc: "Dry run, test data, debugging", video: "openVideoWindow('12_3')", note: "openNoteWindow('12_3')", coach: "openCoachWindow('12_3')", game: "alert('测试用例游戏开发中~')", feynman: "openFeynman('12_3')" }
        ]
    },

    // ==================== A Level ====================
    {
        id: "13_1",
        title: "13 Data Representation",
        cards: [
            { title: "13.1 User-defined data types", desc: "Enumerated, composite types", video: "openVideoWindow('13_1')", note: "openNoteWindow('13_1')", coach: "openCoachWindow('13_1')", game: "alert('自定义类型游戏开发中~')", feynman: "openFeynman('13_1')" },
            { title: "13.2 File organisation and access", desc: "Serial, sequential, random access", video: "openVideoWindow('13_2')", note: "openNoteWindow('13_2')", coach: "openCoachWindow('13_2')", game: "alert('文件访问模拟开发中~')", feynman: "openFeynman('13_2')" },
            { title: "13.3 Floating-point numbers, representation and manipulation", desc: "Mantissa, exponent, normalisation", video: "openVideoWindow('13_3')", note: "openNoteWindow('13_3')", coach: "openCoachWindow('13_3')", game: "alert('浮点数计算挑战开发中~')", feynman: "openFeynman('13_3')" }
        ]
    },
    {
        id: "14_1",
        title: "14 Communication and internet technologies",
        cards: [
            { title: "14.1 Protocols", desc: "HTTP/HTTPS, FTP, TCP/IP layers, DNS", video: "openVideoWindow('14_1')", note: "openNoteWindow('14_1')", coach: "openCoachWindow('14_1')", game: "alert('协议模拟游戏开发中~')", feynman: "openFeynman('14_1')" },
            { title: "14.2 Circuit switching, packet switching", desc: "Comparison, advantages, routing", video: "openVideoWindow('14_2')", note: "openNoteWindow('14_2')", coach: "openCoachWindow('14_2')", game: "alert('包交换可视化开发中~')", feynman: "openFeynman('14_2')" }
        ]
    },
    {
        id: "15_1",
        title: "15 Hardware and Virtual Machines",
        cards: [
            { title: "15.1 Processors, Parallel Processing and Virtual Machines", desc: "RISC/CISC, pipelining, multicore, VM concepts", video: "openVideoWindow('15_1')", note: "openNoteWindow('15_1')", coach: "openCoachWindow('15_1')", game: "alert('并行处理模拟开发中~')", feynman: "openFeynman('15_1')" },
            { title: "15.2 Boolean Algebra and Logic Circuits", desc: "Karnaugh maps, flip-flops, combinational/sequential circuits", video: "openVideoWindow('15_2')", note: "openNoteWindow('15_2')", coach: "openCoachWindow('15_2')", game: "alert('高级逻辑电路搭建开发中~')", feynman: "openFeynman('15_2')" }
        ]
    },
    {
        id: "16_1",
        title: "16 System Software",
        cards: [
            { title: "16.1 Purposes of an Operating System (OS)", desc: "Interrupt handling, virtual memory, scheduling algorithms", video: "openVideoWindow('16_1')", note: "openNoteWindow('16_1')", coach: "openCoachWindow('16_1')", game: "alert('操作系统调度模拟开发中~')", feynman: "openFeynman('16_1')" },
            { title: "16.2 Translation Software", desc: "Linkers, loaders, advanced compilers", video: "openVideoWindow('16_2')", note: "openNoteWindow('16_2')", coach: "openCoachWindow('16_2')", game: "alert('高级翻译软件互动开发中~')", feynman: "openFeynman('16_2')" }
        ]
    },
    {
        id: "17_1",
        title: "17 Security",
        cards: [
            { title: "17.1 Encryption, Encryption Protocols and Digital certificates", desc: "Symmetric/asymmetric, SSL/TLS, digital signatures", video: "openVideoWindow('17_1')", note: "openNoteWindow('17_1')", coach: "openCoachWindow('17_1')", game: "alert('加密解密挑战游戏开发中~')", feynman: "openFeynman('17_1')" }
        ]
    },
    {
        id: "18_1",
        title: "18 Artificial Intelligence (AI)",
        cards: [
            { title: "18.1 Artificial Intelligence", desc: "AI vs human intelligence, machine learning basics, ethics", video: "openVideoWindow('18_1')", note: "openNoteWindow('18_1')", coach: "openCoachWindow('18_1')", game: "alert('AI 决策树游戏开发中~')", feynman: "openFeynman('18_1')" }
        ]
    },
    {
        id: "19_1",
        title: "19 Computational thinking and Problem-solving",
        cards: [
            { title: "19.1 Algorithms", desc: "Complexity (Big O), advanced sorting/searching", video: "openVideoWindow('19_1')", note: "openNoteWindow('19_1')", coach: "openCoachWindow('19_1')", game: "alert('算法复杂度可视化开发中~')", feynman: "openFeynman('19_1')" },
            { title: "19.2 Recursion", desc: "Recursive algorithms, backtracking", video: "openVideoWindow('19_2')", note: "openNoteWindow('19_2')", coach: "openCoachWindow('19_2')", game: "alert('递归塔游戏开发中~')", feynman: "openFeynman('19_2')" }
        ]
    },
    {
        id: "20_1",
        title: "20 Further Programming",
        cards: [
            { title: "20.1 Programming Paradigms", desc: "OOP, functional, declarative", video: "openVideoWindow('20_1')", note: "openNoteWindow('20_1')", coach: "openCoachWindow('20_1')", game: "alert('编程范式对比游戏开发中~')", feynman: "openFeynman('20_1')" },
            { title: "20.2 File Processing and Exception Handling", desc: "Advanced file I/O, try-catch, custom exceptions", video: "openVideoWindow('20_2')", note: "openNoteWindow('20_2')", coach: "openCoachWindow('20_2')", game: "alert('异常处理模拟开发中~')", feynman: "openFeynman('20_2')" }
        ]
    }
];

// ==================== 视频列表（可自行补充真实 BVID） ====================
const videoLists = {
    '1_1': [
        {title:'Binary Basics',bvid:'BV1suquBZEaC'},
        {title:'Hexadecimal',bvid:'BV1H5quBsE9T'},
        {title:'ASCII & Unicode',bvid:'BV1tb421B7ij'}
    ],
    '1_2': [
        {title:'Binary Basics',bvid:'BV1suquBZEaC'},
        {title:'Hexadecimal',bvid:'BV1H5quBsE9T'},
        {title:'ASCII & Unicode',bvid:'BV1tb421B7ij'}
    ],
    '1_3': [
        {title:'Binary Basics',bvid:'BV1suquBZEaC'},
        {title:'Hexadecimal',bvid:'BV1H5quBsE9T'},
        {title:'ASCII & Unicode',bvid:'BV1tb421B7ij'}
    ],
    '2_1': [
        {title:'Binary Basics',bvid:'BV1SE42137b6'},
        {title:'Hexadecimal',bvid:'BV1Ct421M7FC'},
        {title:'ASCII & UnicoStackde',bvid:'BV1Mf421m7ju'}
    ],
    '10_1': [
        {title:'Stack',bvid:'BV1WHk5BXEvT'},
        {title:' ',bvid:' '},
        {title:' ',bvid:' '}

    ],
    // 其他章节视频列表预留为空，打开视频窗口会显示“暂无视频”
    // 示例添加方式：'14_1': [{title:'网络协议详解',bvid:'BV1xxxxxx'}]
};