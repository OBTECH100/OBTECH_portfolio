export const ORANGE = "#FF6B00";

export const skills = {
  Frontend: [
    { name: "React", icon: "⚛️" },
    { name: "HTML5", icon: "🌐" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "🟨" },
  ],
  Backend: [
    { name: "Node.js", icon: "🟩" },
    { name: "Python", icon: "🐍" },
    { name: "PHP", icon: "🐘" },
    { name: "MySQL", icon: "🗄️" },
  ],
  "AI / ML": [
    { name: "TensorFlow", icon: "🧠" },
    { name: "OpenCV", icon: "👁️" },
    { name: "Machine Learning", icon: "🤖" },
    { name: "Deep Learning", icon: "📊" },
  ],
  Tools: [
    { name: "Git", icon: "🔀" },
    { name: "GitHub", icon: "🐙" },
    { name: "VS Code", icon: "💻" },
    { name: "Docker", icon: "🐳" },
  ],
};

export const projects = [
  {
    title: "Face Recognition Student System",
    desc: "An AI-powered attendance system using facial recognition to automate student check-ins, reducing manual errors and saving time for educators.",
    tech: ["Python", "OpenCV", "TensorFlow", "Flask", "MySQL"],
    color: "#FF6B00",
    emoji: "👤",
    github: "#",
    demo: "#",
  },
  {
    title: "Smart Health Tracking App",
    desc: "A full-stack health monitoring application that tracks vitals, generates AI-powered insights, and sends personalised recommendations.",
    tech: ["React", "Node.js", "Python", "MongoDB", "ML"],
    color: "#00C896",
    emoji: "❤️",
    github: "#",
    demo: "#",
  },
  {
    title: "Sign Language Recognition System",
    desc: "Real-time sign language interpreter powered by computer vision and deep learning, bridging communication for the hearing impaired.",
    tech: ["Python", "OpenCV", "TensorFlow", "MediaPipe", "CNN"],
    color: "#7B61FF",
    emoji: "🤟",
    github: "#",
    demo: "#",
  },
  {
    title: "Church Educational Website",
    desc: "A modern, fully-responsive educational platform for a local church — featuring courses, events, and a community bulletin board.",
    tech: ["React", "PHP", "MySQL", "CSS3", "Node.js"],
    color: "#FFB800",
    emoji: "📚",
    github: "#",
    demo: "#",
  },
];

export const journey = [
  { year: "2019", title: "First Line of Code", desc: "Discovered programming through HTML & CSS. Built first static websites and fell in love with creating on the web." },
  { year: "2020", title: "Backend Foundations", desc: "Mastered PHP, MySQL and server-side logic. Built first dynamic web applications with user authentication." },
  { year: "2021", title: "JavaScript & React", desc: "Levelled up to modern frontend development — React, component architecture, REST APIs and responsive design." },
  { year: "2022", title: "Python & AI Journey", desc: "Entered the world of AI/ML with Python, TensorFlow and OpenCV. Built first computer vision projects." },
  { year: "2023", title: "Full-Stack Projects", desc: "Combined all skills to ship real-world applications: facial recognition systems, health trackers, and more." },
  { year: "2024", title: "Backend & AI Engineering", desc: "Deepened expertise in scalable backend architecture, machine learning pipelines and AI-powered APIs." },
  { year: "2025+", title: "Building the Future", desc: "Continuing to innovate — exploring LLMs, cloud infrastructure, and shipping products that create real impact.", current: true },
];
