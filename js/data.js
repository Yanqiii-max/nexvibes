/* NexVibes demo content.
   Every text field is bilingual: { en: '...', zh: '...' }.
   Video sources: { t: 'yt', id } YouTube · { t: 'bili', id } Bilibili · { t: 'own' } NexVibes original (not recorded yet).
   Third-party videos are embedded with their official players and credited to their creators. */

const CATEGORIES = [
  { id: 'foundations', icon: 'spark',   en: 'AI Foundations',      zh: 'AI 通识',       desc: { en: 'How generative AI works, prompting, research tools', zh: '生成式 AI 原理、提示词、研究工具' } },
  { id: 'image',       icon: 'image',   en: 'Image Generation',    zh: '图像生成',       desc: { en: 'Midjourney, Flux, Nano Banana, ComfyUI', zh: 'Midjourney、Flux、Nano Banana、ComfyUI' } },
  { id: 'video',       icon: 'film',    en: 'Video Generation',    zh: '视频生成',       desc: { en: 'Hailuo, Kling, Runway, Veo, Sora, Flow', zh: '海螺、可灵、Runway、Veo、Sora、Flow' } },
  { id: 'audio',       icon: 'wave',    en: 'Voice & Music',       zh: '声音与音乐',     desc: { en: 'Voice-over, cloning, sound design, AI songs', zh: '配音、声音克隆、音效、AI 作曲' } },
  { id: 'story',       icon: 'pen',     en: 'Script & Story',      zh: '剧本与叙事',     desc: { en: 'Screenwriting, treatments, storyboards', zh: '编剧、故事大纲、分镜' } },
  { id: 'design',      icon: 'palette', en: 'Design & Post',       zh: '设计与后期',     desc: { en: 'Firefly, Photoshop AI, product visuals', zh: 'Firefly、Photoshop AI、产品视觉' } },
  { id: 'film',        icon: 'clapper', en: 'AI Filmmaking',       zh: 'AI 影视制作',    desc: { en: 'End-to-end short films, consistency, lip sync', zh: '短片全流程、角色一致性、口型同步' } },
  { id: 'marketing',   icon: 'mega',    en: 'Advertising & Brand', zh: '广告与品牌',     desc: { en: 'AI commercials, campaigns, product shots', zh: 'AI 广告片、营销物料、产品图' } },
  { id: 'build',       icon: 'code',    en: 'Build with AI',       zh: 'AI 建站与编程',  desc: { en: 'Vibe coding, websites, creative tools', zh: 'Vibe Coding、做网站、做创意工具' } }
];

/* Discipline tracks (majors) – maps university programmes to course bundles */
const TRACKS = [
  { id: 'cinematic', en: 'Cinematic Arts & Film',     zh: '电影与影视艺术', courses: ['story', 'hailuo', 'video-tools', 'short-film', 'voice-music'] },
  { id: 'design',    en: 'Visual & Graphic Design',   zh: '视觉与平面设计', courses: ['image-gen', 'comfyui', 'adobe-ai', 'ads'] },
  { id: 'media',     en: 'Media & Communication',     zh: '传媒与传播',     codes: '', courses: ['foundations', 'prompting', 'ads', 'research'] },
  { id: 'animation', en: 'Animation & Games',         zh: '动画与游戏',     courses: ['image-gen', 'hailuo', 'short-film', 'music-video'] },
  { id: 'music',     en: 'Music & Sound',             zh: '音乐与声音',     courses: ['voice-music', 'music-video'] },
  { id: 'all',       en: 'Every major (General Ed)',  zh: '全专业通识',     courses: ['foundations', 'prompting', 'research', 'vibe-coding'] }
];

const COURSES = [
  /* ---------------- FOUNDATIONS ---------------- */
  {
    id: 'foundations', cat: 'foundations', level: 'beginner', access: 'free', credits: 1, hours: 4, featured: true, kind: 'general',
    title: { en: 'AI Foundations for Creators', zh: '创作者的 AI 通识课' },
    sub: { en: 'What a large language model really is, why “attention” changed everything, and how to use chatbots like a pro — explained visually.', zh: '大语言模型到底是什么、为什么“注意力机制”改变了一切、怎样像专业人士一样使用 AI 助手——全程可视化讲解。' },
    outcomes: {
      en: ['Explain in plain words how a language model predicts text', 'Understand tokens, context windows and why models “hallucinate”', 'Pick the right AI assistant for a creative task', 'Use AI critically, not blindly'],
      zh: ['用大白话解释语言模型如何“预测下一个词”', '理解 token、上下文窗口，以及模型为什么会“幻觉”', '为不同的创作任务选对 AI 助手', '批判地使用 AI，而不是盲目依赖']
    },
    lessons: [
      { id: 'f1', src: { t: 'yt', id: 'LPZh9BOjkQs' }, dur: '7:58', by: '3Blue1Brown',
        title: { en: 'Large language models, explained briefly', zh: '一节课看懂大语言模型' },
        sum: { en: 'A short, visual overview of what happens inside a chatbot when you type a message: text becomes tokens, tokens become numbers, and the model predicts what comes next — one token at a time.', zh: '用很短的时间、可视化地讲清楚：你给聊天机器人发一句话后它内部发生了什么——文字变成 token，token 变成数字，模型一次一个 token 地预测接下来的内容。' },
        pts: { en: ['A model is a giant function with billions of tunable parameters', 'Pre-training: learn from huge amounts of text by predicting the next word', 'Fine-tuning with human feedback turns a predictor into a helpful assistant'], zh: ['模型本质是一个拥有数十亿可调参数的巨大函数', '预训练：通过海量文本“猜下一个词”来学习', '基于人类反馈的微调，让“预测器”变成“好助手”'] } },
      { id: 'f2', src: { t: 'yt', id: 'wjZofJX0v4M' }, dur: '27:14', by: '3Blue1Brown', alt: { t: 'bili', id: 'BV1qM4m1d7is', label: '中文配音版' },
        title: { en: 'Transformers, the tech behind LLMs', zh: 'Transformer：大模型背后的技术' },
        sum: { en: 'The transformer architecture is the engine of today’s AI — for text, images and video. This lesson walks through embeddings and the overall data flow of a GPT.', zh: 'Transformer 架构是当下 AI 的引擎——文本、图像、视频都靠它。本课讲解词嵌入（embedding）和 GPT 的整体数据流。' },
        pts: { en: ['Words live as vectors in a high-dimensional “meaning space”', 'Attention lets every word look at every other word', 'The same architecture powers image and video models'], zh: ['词语以向量的形式存在于高维“语义空间”', '注意力机制让每个词都能“看到”其他所有词', '同样的架构也驱动着图像和视频模型'] } },
      { id: 'f3', src: { t: 'yt', id: 'zjkBMFhNj_g' }, dur: '59:48', by: 'Andrej Karpathy',
        title: { en: 'Intro to large language models (1-hour talk)', zh: '大语言模型入门（一小时讲座）' },
        sum: { en: 'A legendary general-audience talk by a founding member of OpenAI: how LLMs are trained, why they are like an “operating system”, and where their security risks lie.', zh: 'OpenAI 创始成员之一面向大众的经典讲座：大模型怎么训练、为什么说它像一个“操作系统”、以及它的安全风险在哪里。' },
        pts: { en: ['An LLM is “two files”: parameters + the code that runs them', 'Training is lossy compression of the internet', 'Jailbreaks and prompt injection are real risks for users'], zh: ['大模型就是“两个文件”：参数 + 运行参数的代码', '训练过程相当于对互联网做有损压缩', '越狱和提示词注入是用户需要了解的真实风险'] } },
      { id: 'f4', src: { t: 'yt', id: 'EWvNQjAaOHw' }, dur: '2:11:12', by: 'Andrej Karpathy',
        title: { en: 'How I use LLMs — a practical tour', zh: '我是怎么用大模型的——实操巡礼' },
        sum: { en: 'A practical walkthrough of everyday AI use: choosing models, thinking models, web search, file upload, voice, images and video — with real examples.', zh: '日常使用 AI 的实操演示：如何选模型、什么是“思考型”模型、联网搜索、上传文件、语音、图像与视频——全部配真实案例。' },
        pts: { en: ['Match the model to the task: fast vs. “thinking” models', 'Give the model context: documents, images, examples', 'Always verify facts that matter'], zh: ['按任务选模型：快速模型 vs “思考型”模型', '给模型足够的上下文：文档、图片、示例', '重要的事实一定要自己核实'] } },
      { id: 'f5', src: { t: 'own' }, dur: '—', by: 'NexVibes Faculty',
        title: { en: 'Studio session: AI literacy for media students', zh: '工作室课：传媒学生的 AI 素养' },
        sum: { en: 'An original NexVibes lecture recorded with our faculty. It connects the technical basics above to real creative practice in film, design and media.', zh: 'NexVibes 讲师团队录制的原创课程，把上面的技术基础和电影、设计、传媒的真实创作实践连接起来。' },
        pts: { en: ['Coming soon — recording in progress', 'Will include downloadable slides', 'Bilingual subtitles (EN / 中文)'], zh: ['即将上线——录制中', '将附带可下载课件', '中英双语字幕'] } }
    ],
    task: { en: 'Write a 300-word explainer: “How does an AI chatbot write a sentence?” for a friend who has never used AI.', zh: '写一篇 300 字科普：“AI 聊天机器人是怎么写出一句话的？”读者是一个从没用过 AI 的朋友。' }
  },
  {
    id: 'prompting', cat: 'foundations', level: 'beginner', access: 'free', credits: 1, hours: 4, featured: true, kind: 'general',
    title: { en: 'Prompt Engineering Essentials', zh: '提示词工程基础' },
    sub: { en: 'The universal skill behind every AI tool: give clear direction, context, examples and constraints — and iterate.', zh: '所有 AI 工具背后的通用能力：给出清晰的指令、背景、示例和约束——然后不断迭代。' },
    outcomes: {
      en: ['Write structured prompts with role, task, context and format', 'Use examples (few-shot) to control style', 'Break complex creative tasks into chained prompts', 'Build a personal prompt library'],
      zh: ['写出包含角色、任务、背景、格式的结构化提示词', '用示例（few-shot）控制风格', '把复杂创作任务拆成提示词链', '建立自己的提示词库']
    },
    lessons: [
      { id: 'p1', src: { t: 'yt', id: 'ysPbXH0LpIE' }, dur: '24:53', by: 'Anthropic',
        title: { en: 'Prompting 101', zh: '提示词入门 101' },
        sum: { en: 'Anthropic’s own team builds a real prompt step by step, showing how structure, context and examples turn a vague request into a reliable result.', zh: 'Anthropic 官方团队一步步搭建一个真实提示词，演示结构、背景和示例如何把模糊的请求变成稳定可靠的结果。' },
        pts: { en: ['Start with the task and the context — be explicit', 'Separate instructions from material with clear sections', 'Iterate: test, read the output, refine'], zh: ['先写清任务和背景——越明确越好', '用清晰的分段把“指令”和“素材”分开', '迭代：测试、阅读输出、再修改'] } },
      { id: 'p2', src: { t: 'yt', id: '8ib4Qnh2HFE' }, dur: '2:28:47', by: 'DeepLearning.AI · Andrew Ng', alt: { t: 'bili', id: 'BV1gs4y1R7EJ', label: '吴恩达提示工程 · 中文字幕' },
        title: { en: 'Full AI prompting course with Andrew Ng', zh: '吴恩达完整提示词课程' },
        sum: { en: 'A comprehensive course from one of the most trusted AI educators, covering prompting for writing, analysis, brainstorming and everyday productivity.', zh: '来自全球最受信赖的 AI 教育者之一的完整课程，涵盖写作、分析、头脑风暴和日常效率场景下的提示词技巧。' },
        pts: { en: ['Treat the model like a smart intern who lacks context', 'Ask for drafts, then critique and improve them', 'Use AI as a thinking partner, not only an answer machine'], zh: ['把模型当作一个聪明但缺乏背景信息的实习生', '先要初稿，再让它批判和改进', '把 AI 当思考伙伴，而不只是答案机器'] } },
      { id: 'p3', src: { t: 'yt', id: 'p09yRj47kNM' }, dur: '20:17', by: 'Tina Huang',
        title: { en: 'Google’s prompt engineering course in 20 minutes', zh: '20 分钟浓缩谷歌提示词课程' },
        sum: { en: 'A fast summary of a long official course: frameworks you can memorise and apply to any tool, from chatbots to image generators.', zh: '把一门很长的官方课程浓缩成 20 分钟：可以记住、并套用到任何工具（从聊天机器人到图像生成器）的框架。' },
        pts: { en: ['A five-part framework: task, context, references, evaluate, iterate', 'Prompt chaining for multi-step projects', 'Meta-prompting: ask AI to improve your prompt'], zh: ['五步框架：任务、背景、参考、评估、迭代', '用提示词链完成多步骤项目', '元提示：让 AI 帮你改进提示词'] } }
    ],
    task: { en: 'Build a “prompt portfolio”: 10 prompts for a creative project, each with the goal, the prompt, the result and what you changed.', zh: '做一份“提示词作品集”：为一个创作项目写 10 条提示词，每条记录目标、提示词、结果和你做了什么修改。' }
  },
  {
    id: 'research', cat: 'foundations', level: 'beginner', access: 'campus', credits: 0.5, hours: 1, kind: 'general',
    title: { en: 'AI Research & Study Tools', zh: 'AI 研究与学习工具' },
    sub: { en: 'Turn readings, lectures and references into podcasts, mind maps and study guides with NotebookLM.', zh: '用 NotebookLM 把阅读材料、讲座和参考资料变成播客、思维导图和学习指南。' },
    outcomes: { en: ['Build a source-grounded notebook for a project', 'Generate study guides and audio overviews', 'Cite sources instead of trusting the model’s memory'], zh: ['为一个项目建立“基于资料”的笔记本', '生成学习指南和音频概览', '引用原始资料，而不是依赖模型的记忆'] },
    lessons: [
      { id: 'r1', src: { t: 'yt', id: 'EOmgC3-hznM' }, dur: '12:36', by: 'Jeff Su',
        title: { en: 'Learn 80% of NotebookLM in 13 minutes', zh: '13 分钟掌握 NotebookLM 的 80%' },
        sum: { en: 'NotebookLM answers only from the sources you upload — ideal for research-heavy creative work such as documentaries and period films.', zh: 'NotebookLM 只根据你上传的资料作答——非常适合纪录片、年代剧这类需要大量调研的创作。' },
        pts: { en: ['Upload PDFs, links and videos as sources', 'Every answer comes with clickable citations', 'Audio Overviews turn sources into a two-host podcast'], zh: ['可上传 PDF、网页链接、视频作为资料', '每个回答都附带可点击的出处', '“音频概览”把资料变成双人对谈播客'] } },
      { id: 'r2', src: { t: 'yt', id: 'uSVBfyHBiDU' }, dur: '7:56', by: 'Kevin Stratvert',
        title: { en: 'NotebookLM full tutorial', zh: 'NotebookLM 完整教程' },
        sum: { en: 'A clean step-by-step tour of the interface, from creating your first notebook to sharing it with classmates.', zh: '一步一步熟悉界面：从创建第一个笔记本到分享给同学。' },
        pts: { en: ['Create a notebook per project', 'Use “Studio” outputs: guides, FAQs, timelines', 'Share notebooks for group work'], zh: ['每个项目建一个笔记本', '使用“工作室”产出：指南、问答、时间线', '小组作业可共享笔记本'] } }
    ],
    task: { en: 'Create a NotebookLM notebook for your next project with at least 5 sources. Submit a screenshot and a one-page study guide it produced.', zh: '为你的下一个项目建一个至少包含 5 份资料的 NotebookLM 笔记本，提交截图和它生成的一页学习指南。' }
  },

  /* ---------------- IMAGE ---------------- */
  {
    id: 'image-gen', cat: 'image', level: 'beginner', access: 'campus', credits: 2, hours: 6, featured: true, kind: 'pro',
    title: { en: 'AI Image Generation: From Prompt to Key Art', zh: 'AI 图像生成：从提示词到海报主视觉' },
    sub: { en: 'Create concept art, posters and mood boards with Midjourney, Nano Banana and Flux — and learn the visual vocabulary that makes images look intentional.', zh: '用 Midjourney、Nano Banana、Flux 创作概念图、海报和情绪板——并掌握让画面“有意图”的视觉语言。' },
    outcomes: { en: ['Describe images with shot, lens, light, colour and style language', 'Control composition with references and parameters', 'Edit images conversationally with Nano Banana', 'Deliver a consistent visual series'], zh: ['用景别、镜头、光线、色彩、风格的语言描述画面', '用参考图和参数控制构图', '用 Nano Banana 以对话方式修图', '交付一组风格统一的系列图'] },
    lessons: [
      { id: 'i1', src: { t: 'yt', id: 'vUj4VNXXC1c' }, dur: '55:34', by: 'Future Tech Pilot',
        title: { en: 'The ultimate beginner’s guide to Midjourney', zh: 'Midjourney 新手终极指南' },
        sum: { en: 'Everything you need to start with Midjourney: the web interface, prompt structure, aspect ratios, stylise, variations and style references.', zh: '入门 Midjourney 所需的一切：网页界面、提示词结构、画幅比例、风格化参数、变体与风格参考。' },
        pts: { en: ['Subject → setting → style → lighting → camera', 'Use --ar for format, --s for stylisation', 'Style & character references keep a series consistent'], zh: ['主体 → 场景 → 风格 → 光线 → 镜头', '用 --ar 控制画幅，--s 控制风格化强度', '风格参考和角色参考让系列图保持一致'] } },
      { id: 'i2', src: { t: 'yt', id: 'nnlgMpyq-j0' }, dur: '19:19', by: 'AI Master',
        title: { en: 'Nano Banana: 15 prompt techniques', zh: 'Nano Banana：15 个提示词技巧' },
        sum: { en: 'Google’s Gemini image model edits pictures through conversation — change outfits, merge photos, relight scenes and keep faces consistent.', zh: '谷歌 Gemini 图像模型可以通过对话修图——换装、合成多张照片、重新打光，还能保持人脸一致。' },
        pts: { en: ['Edit by describing the change, not the whole image', 'Combine multiple reference photos in one prompt', 'Iterate in small steps to keep identity stable'], zh: ['描述“要改什么”，而不是重新描述整张图', '一条提示词里可以组合多张参考图', '小步迭代，人物身份更稳定'] } },
      { id: 'i3', src: { t: 'yt', id: 'xOoAlRjTKTw' }, dur: '3:14', by: 'Kevin Stratvert',
        title: { en: 'Flux: a free image generator on your own PC', zh: 'Flux：在自己电脑上免费生图' },
        sum: { en: 'Open-weight models like Flux run locally — no subscription, full privacy, and the starting point for advanced workflows in ComfyUI.', zh: '像 Flux 这样的开放权重模型可以本地运行——无需订阅、隐私可控，也是进阶 ComfyUI 工作流的起点。' },
        pts: { en: ['Open-weight vs. closed models', 'Hardware basics: GPU memory matters', 'Licensing: check commercial-use terms'], zh: ['开放权重模型 vs 闭源模型', '硬件基础：显存很关键', '版权许可：注意是否允许商用'] } },
      { id: 'i4', src: { t: 'bili', id: 'BV1As4y127HW' }, dur: '17:53', by: 'Nenly同学 (Bilibili)',
        title: { en: 'Stable Diffusion, systematically (Chinese)', zh: '系统学 Stable Diffusion（中文）' },
        sum: { en: 'A well-known systematic Chinese course on Stable Diffusion — useful for bilingual learners and for understanding the open-source image ecosystem.', zh: 'B 站知名的 Stable Diffusion 系统课第一讲——适合双语学习者，也能帮助理解开源图像生态。' },
        pts: { en: ['Models, checkpoints and LoRA', 'Positive vs. negative prompts', 'Sampling steps and CFG explained'], zh: ['大模型、Checkpoint 与 LoRA', '正向提示词与反向提示词', '采样步数与 CFG 参数'] } }
    ],
    task: { en: 'Design key art for an imaginary film: 1 poster + 3 mood frames in a consistent style. Include your prompts.', zh: '为一部虚构电影设计主视觉：1 张海报 + 3 张风格统一的情绪帧，并附上提示词。' }
  },
  {
    id: 'comfyui', cat: 'image', level: 'advanced', access: 'premium', credits: 2, hours: 8, kind: 'pro',
    title: { en: 'ComfyUI: Node-based Creative Workflows', zh: 'ComfyUI：节点式创作工作流' },
    sub: { en: 'Go beyond the prompt box. Build repeatable, controllable pipelines for images and video with ComfyUI’s node graph.', zh: '超越输入框。用 ComfyUI 的节点图，搭建可复用、可控制的图像与视频生产管线。' },
    outcomes: { en: ['Read and build a ComfyUI graph from scratch', 'Use ControlNet, LoRA and upscalers', 'Save and share workflows as templates'], zh: ['从零读懂并搭建 ComfyUI 节点图', '使用 ControlNet、LoRA 和放大模型', '把工作流保存为模板并分享'] },
    lessons: [
      { id: 'c1', src: { t: 'yt', id: 'hl7kwMwkLJU' }, dur: '9:10', by: 'Kevin Stratvert',
        title: { en: 'How to use ComfyUI — step by step', zh: 'ComfyUI 入门：一步一步来' },
        sum: { en: 'Installation, the default workflow and the core nodes: load model, prompt, sampler, decode, save.', zh: '安装、默认工作流，以及核心节点：加载模型、提示词、采样器、解码、保存。' },
        pts: { en: ['Every image is a graph of nodes', 'The KSampler is where generation happens', 'Drag a PNG back in to recover its workflow'], zh: ['每张图都是一张节点图', 'KSampler 是真正“生成”发生的地方', '把生成的 PNG 拖回去就能还原工作流'] } },
      { id: 'c2', src: { t: 'yt', id: '23VkGD-4uwk' }, dur: '39:12', by: 'Sebastian Kamph',
        title: { en: 'ComfyUI for beginners — deep dive', zh: 'ComfyUI 新手深度教程' },
        sum: { en: 'A longer, hands-on session that builds intuition for latent space, samplers, schedulers and custom nodes.', zh: '更长的实操课，帮助建立对潜空间、采样器、调度器和自定义节点的直觉。' },
        pts: { en: ['Latent space in plain words', 'Choosing samplers and schedulers', 'Installing custom nodes safely'], zh: ['用大白话理解潜空间', '如何选择采样器和调度器', '安全地安装自定义节点'] } },
      { id: 'c3', src: { t: 'yt', id: 'TQhIYT1ZYGQ' }, dur: '1:12:16', by: 'ComfyUI (official)',
        title: { en: 'Full node-graph basics (official)', zh: '节点图基础全解（官方）' },
        sum: { en: 'The official ComfyUI channel’s complete basics course — the reference to come back to.', zh: 'ComfyUI 官方频道的完整基础课——遇到问题可以随时回来查阅。' },
        pts: { en: ['Groups, reroutes and tidy graphs', 'Batch generation for variations', 'Templates for image and video'], zh: ['分组、转接点，让节点图整洁', '批量生成多种变体', '图像与视频的工作流模板'] } }
    ],
    task: { en: 'Build a ComfyUI workflow that turns a rough sketch into a finished illustration. Submit the workflow JSON and before/after images.', zh: '搭一个把草图变成完整插画的 ComfyUI 工作流，提交工作流 JSON 和前后对比图。' }
  },

  /* ---------------- VIDEO ---------------- */
  {
    id: 'hailuo', cat: 'video', level: 'beginner', access: 'campus', credits: 2, hours: 5, featured: true, spotlight: true, kind: 'pro',
    title: { en: 'AI Video with MiniMax Hailuo', zh: '用 MiniMax 海螺做 AI 视频' },
    sub: { en: 'Text-to-video and image-to-video with Hailuo, plus MiniMax Audio for voice — a complete beginner-to-pro workflow for cinematic shots.', zh: '用海螺做文生视频、图生视频，再用 MiniMax Audio 配音——从入门到进阶的电影感镜头完整流程。' },
    outcomes: { en: ['Write video prompts with subject, action, camera and mood', 'Animate key frames with image-to-video', 'Direct camera movement intentionally', 'Add voice with MiniMax Audio'], zh: ['写出包含主体、动作、运镜、氛围的视频提示词', '用图生视频让关键帧动起来', '有意识地设计运镜', '用 MiniMax Audio 配音'] },
    lessons: [
      { id: 'h1', src: { t: 'yt', id: 'BnwcL1mhoPY' }, dur: '26:14', by: 'Rourke',
        title: { en: 'Hailuo video masterclass: beginner to pro', zh: '海螺视频大师课：从入门到进阶' },
        sum: { en: 'A complete tour of Hailuo: text-to-video, image-to-video, subject reference and camera control, with many prompt examples.', zh: '海螺的完整巡礼：文生视频、图生视频、主体参考、运镜控制，附大量提示词示例。' },
        pts: { en: ['Image-to-video gives you the most control', 'Describe motion and camera separately', 'Generate several takes, then choose like an editor'], zh: ['图生视频的可控性最强', '把“动作”和“运镜”分开描述', '多生成几条，像剪辑师一样挑选'] } },
      { id: 'h2', src: { t: 'yt', id: 'ki3ND5lRT18' }, dur: '12:09', by: 'Digital Delegator',
        title: { en: 'Hailuo + MiniMax Audio: full workflow', zh: '海螺 + MiniMax Audio 完整流程' },
        sum: { en: 'From image to moving shot to narrated scene: pairing MiniMax’s video and voice models in one pipeline.', zh: '从图片到动态镜头再到带旁白的场景：把 MiniMax 的视频与语音模型串成一条流程。' },
        pts: { en: ['Plan the shot list before generating', 'Match voice tone to the visual mood', 'Assemble and pace in an editor'], zh: ['生成之前先列好镜头清单', '让声音的语气匹配画面情绪', '在剪辑软件里组装并控制节奏'] } },
      { id: 'h3', src: { t: 'yt', id: 'J2Cyhd6duw4' }, dur: '24:30', by: 'Tiny Scouts',
        title: { en: 'A 3D animated story with MiniMax', zh: '用 MiniMax 做一个 3D 动画故事' },
        sum: { en: 'A full project: writing a short children’s story, designing characters and animating every scene into a finished 3D-style film.', zh: '完整项目：写一个儿童短故事、设计角色、把每个场景动起来，最终完成一部 3D 风格短片。' },
        pts: { en: ['Story first, tools second', 'Keep a character sheet for consistency', 'Short scenes are easier to control'], zh: ['先有故事，再选工具', '用角色设定图保持一致性', '短镜头更容易控制'] } },
      { id: 'h4', src: { t: 'own' }, dur: '—', by: 'NexVibes Faculty',
        title: { en: 'Studio session: directing camera movement', zh: '工作室课：如何“导演”运镜' },
        sum: { en: 'Original NexVibes lesson: classic camera moves (dolly, crane, orbit, handheld) and how to prompt each one.', zh: 'NexVibes 原创课：经典运镜（推拉、升降、环绕、手持）以及每种运镜的提示词写法。' },
        pts: { en: ['Coming soon — recording in progress', 'Shot-by-shot prompt templates', 'Assignment walkthrough'], zh: ['即将上线——录制中', '逐镜头提示词模板', '作业讲解'] } }
    ],
    task: { en: 'Create a 15-second cinematic shot with Hailuo: one key frame, one camera move, one emotion. Submit the video link and your prompts.', zh: '用海螺做一个 15 秒的电影感镜头：一个关键帧、一个运镜、一种情绪。提交视频链接和提示词。' }
  },
  {
    id: 'video-tools', cat: 'video', level: 'intermediate', access: 'campus', credits: 2, hours: 6, kind: 'pro',
    title: { en: 'The AI Video Landscape: Kling, Runway, Veo, Sora & Flow', zh: 'AI 视频全景：可灵、Runway、Veo、Sora 与 Flow' },
    sub: { en: 'Every major video model has a personality. Learn their strengths so you can pick the right one for each shot.', zh: '每个主流视频模型都有自己的“性格”。了解它们的长处，才能为每个镜头选对工具。' },
    outcomes: { en: ['Compare leading video models on motion, realism and control', 'Use native audio generation (Veo, Sora)', 'Plan a multi-tool production'], zh: ['从运动、真实感、可控性比较主流视频模型', '使用原生音频生成（Veo、Sora）', '规划多工具协作的制作流程'] },
    lessons: [
      { id: 'v1', src: { t: 'yt', id: 'EWBsU0fSgPs' }, dur: '8:01', by: 'Roboverse',
        title: { en: 'Kling AI: stop wasting credits', zh: '可灵 AI：别再浪费积分' },
        sum: { en: 'Practical tips to get usable Kling results on the first tries: prompt structure, start/end frames and motion settings.', zh: '让可灵前几次就出可用结果的实用技巧：提示词结构、首尾帧和运动参数。' },
        pts: { en: ['Start and end frames for controlled transitions', 'Keep prompts short and visual', 'Use negative prompts to avoid artefacts'], zh: ['用首尾帧控制转场', '提示词简短、画面感强', '用反向提示词避免瑕疵'] } },
      { id: 'v2', src: { t: 'yt', id: 'D4tzDHwDkhE' }, dur: '15:13', by: 'Tao Prompts',
        title: { en: 'Cinematic videos with Runway Gen-4', zh: '用 Runway Gen-4 做电影感视频' },
        sum: { en: 'Runway’s reference-driven workflow for consistent characters and locations across shots.', zh: 'Runway 以参考图为核心的流程，让角色和场景在多个镜头间保持一致。' },
        pts: { en: ['References keep the world consistent', 'Think in shots, not clips', 'Runway’s editing tools for finishing'], zh: ['参考图让“世界观”保持一致', '用“镜头”而不是“片段”思考', '用 Runway 的编辑工具完成后期'] } },
      { id: 'v3', src: { t: 'yt', id: 'IjF5Uun2jrM' }, dur: '6:30', by: 'Kevin Stratvert',
        title: { en: 'Google Veo 3: cinematic video from a prompt', zh: 'Google Veo 3：一句话生成电影感视频' },
        sum: { en: 'Veo generates video with synchronised dialogue, sound effects and ambience — a big step for narrative work.', zh: 'Veo 能生成带同步对白、音效和环境声的视频——对叙事创作是很大的进步。' },
        pts: { en: ['Write dialogue in quotes inside the prompt', 'Describe sound as well as image', 'Check output for artefacts in hands and text'], zh: ['在提示词里用引号写对白', '既描述画面，也描述声音', '检查手部和文字等易出错的地方'] } },
      { id: 'v4', src: { t: 'yt', id: 'lHhHEw-Nkg0' }, dur: '8:42', by: 'Kevin Stratvert',
        title: { en: 'How to use Sora 2', zh: 'Sora 2 使用教程' },
        sum: { en: 'OpenAI’s video model: physics-aware motion, audio, and the cameo feature — plus the responsible-use rules around likeness.', zh: 'OpenAI 的视频模型：符合物理的运动、音频、客串（cameo）功能——以及关于肖像使用的规则。' },
        pts: { en: ['Strong physical realism', 'Likeness and consent rules matter', 'Remix and extend existing clips'], zh: ['物理真实感强', '肖像与授权规则很重要', '可以混剪和延展已有片段'] } },
      { id: 'v5', src: { t: 'yt', id: '0vQ7UEe7rLg' }, dur: '9:15', by: 'Kevin Stratvert',
        title: { en: 'Google Flow, step by step', zh: 'Google Flow 分步教程' },
        sum: { en: 'Flow is Google’s AI filmmaking workspace: generate, extend and arrange shots into scenes in one place.', zh: 'Flow 是谷歌的 AI 电影制作工作台：在一个地方生成、延展镜头，并把镜头排成场景。' },
        pts: { en: ['Scenebuilder for sequencing shots', 'Ingredients: reusable characters and objects', 'Extend shots for longer takes'], zh: ['用场景编排器排列镜头', '“素材”：可复用的角色与物件', '延展镜头得到更长的连续镜头'] } }
    ],
    task: { en: 'Generate the same 5-second shot in three different video models. Write a comparison table (motion, realism, prompt adherence, cost).', zh: '用三个不同的视频模型生成同一个 5 秒镜头，写一张对比表（运动、真实感、提示词遵循度、成本）。' }
  },

  /* ---------------- AUDIO ---------------- */
  {
    id: 'voice-music', cat: 'audio', level: 'beginner', access: 'campus', credits: 1.5, hours: 4, featured: true, kind: 'pro',
    title: { en: 'AI Voice, Sound & Music', zh: 'AI 配音、音效与音乐' },
    sub: { en: 'Voice-overs with emotion, ethical voice cloning, and full songs with Suno — the sound half of every film.', zh: '有情绪的配音、合规的声音克隆、用 Suno 写一整首歌——影片的另一半是声音。' },
    outcomes: { en: ['Generate expressive narration with emotion control', 'Understand consent rules for voice cloning', 'Write and structure songs with AI', 'Mix voice, music and effects'], zh: ['生成可控情绪的旁白', '了解声音克隆的授权规则', '用 AI 写歌并安排歌曲结构', '混合人声、音乐与音效'] },
    lessons: [
      { id: 'a1', src: { t: 'yt', id: 'tCx1ZRFtei8' }, dur: '8:41', by: 'Tech Tutor',
        title: { en: 'MiniMax Audio: realistic AI voice', zh: 'MiniMax Audio：逼真的 AI 配音' },
        sum: { en: 'MiniMax’s speech model produces natural, multilingual voices with fine emotional control — great for narration and characters.', zh: 'MiniMax 的语音模型能生成自然、多语种的声音，并可细致控制情绪——非常适合旁白和角色配音。' },
        pts: { en: ['Choose voices by age, tone and accent', 'Use emotion and pause tags', 'Multilingual output for global audiences'], zh: ['按年龄、音色、口音选择声音', '使用情绪与停顿标签', '多语种输出，面向全球观众'] } },
      { id: 'a2', src: { t: 'yt', id: 's7p6OLwV_50' }, dur: '23:47', by: 'Dan Kieft',
        title: { en: 'Mastering ElevenLabs', zh: '精通 ElevenLabs' },
        sum: { en: 'Text-to-speech, voice design, dubbing and sound effects in one of the most widely used audio platforms.', zh: '在最常用的音频平台之一上完成文本转语音、声音设计、配音翻译和音效。' },
        pts: { en: ['Voice design from a text description', 'Automatic dubbing into other languages', 'Sound effects from prompts'], zh: ['用文字描述“设计”一个声音', '自动翻译配音成其他语言', '用提示词生成音效'] } },
      { id: 'a3', src: { t: 'yt', id: 'Vfai49qhluA' }, dur: '16:48', by: 'Suno (official)', alt: { t: 'bili', id: 'BV1mJ4m1G7T1', label: 'Suno 中文教程' },
        title: { en: 'How to use Suno: beginner to pro', zh: 'Suno 使用：从入门到进阶' },
        sum: { en: 'The official walkthrough: styles, custom lyrics, song structure tags, extending and editing tracks.', zh: '官方教程：风格设置、自定义歌词、歌曲结构标签、延展与编辑音轨。' },
        pts: { en: ['[Verse] [Chorus] tags shape the song', 'Describe genre, mood, instruments and tempo', 'Check licensing before commercial use'], zh: ['[Verse] [Chorus] 等标签决定歌曲结构', '描述曲风、情绪、乐器和速度', '商用前确认版权条款'] } }
    ],
    task: { en: 'Produce a 60-second audio piece: narration + original AI music + 3 sound effects. Submit the audio file and a cue sheet.', zh: '制作一段 60 秒音频作品：旁白 + AI 原创配乐 + 3 个音效。提交音频文件和音乐提示表。' }
  },

  /* ---------------- STORY ---------------- */
  {
    id: 'story', cat: 'story', level: 'beginner', access: 'campus', credits: 1.5, hours: 4, kind: 'pro',
    title: { en: 'AI for Screenwriting & Storyboarding', zh: 'AI 辅助编剧与分镜' },
    sub: { en: 'Use AI as a writers’ room — for brainstorming, structure and feedback — and turn scripts into visual storyboards.', zh: '把 AI 当作“编剧室”——用于头脑风暴、结构梳理和反馈——再把剧本变成可视化分镜。' },
    outcomes: { en: ['Develop a logline, beat sheet and treatment with AI', 'Keep your own voice — AI as collaborator, not author', 'Turn a scene into a shot list and storyboard'], zh: ['借助 AI 写出一句话梗概、节拍表和故事大纲', '保持自己的声音——AI 是合作者而不是作者', '把一场戏变成镜头清单和分镜'] },
    lessons: [
      { id: 's1', src: { t: 'yt', id: 'dYFhXvuDftY' }, dur: '12:00', by: 'Think Media',
        title: { en: 'Stop using ChatGPT to write scripts (do this instead)', zh: '别再让 ChatGPT 直接写剧本（应该这样做）' },
        sum: { en: 'Why AI-written scripts sound generic — and how to use AI to sharpen your ideas instead of replacing them.', zh: '为什么 AI 写的剧本千篇一律——以及如何用 AI 打磨你的想法，而不是取代你。' },
        pts: { en: ['Feed AI your own voice and examples', 'Ask for questions and critique, not finished text', 'Outline first, draft yourself, refine with AI'], zh: ['把你自己的风格和示例喂给 AI', '让它提问和批评，而不是直接给成品', '先列大纲，自己写初稿，再用 AI 打磨'] } },
      { id: 's2', src: { t: 'yt', id: '9oy7U-zzTjQ' }, dur: '9:11', by: 'AI Discovery',
        title: { en: 'How to make a storyboard with AI', zh: '如何用 AI 做分镜' },
        sum: { en: 'From script to panels: generating consistent storyboard frames and laying them out for a shoot or an AI production.', zh: '从剧本到分镜格：生成风格一致的分镜画面，并排版用于实拍或 AI 制作。' },
        pts: { en: ['Break the scene into numbered shots', 'Keep characters consistent across panels', 'Add camera notes under every frame'], zh: ['把一场戏拆成编号镜头', '让角色在每格分镜中保持一致', '每一格下面写上镜头说明'] } },
      { id: 's3', src: { t: 'yt', id: 'xZx5940qoKE' }, dur: '10:49', by: 'Youri van Hofwegen',
        title: { en: 'Storyboarding realistic AI videos with Google Flow', zh: '用 Google Flow 为写实 AI 视频做分镜' },
        sum: { en: 'Storyboards that turn directly into generated shots — the bridge between pre-production and production.', zh: '分镜可以直接变成生成的镜头——连接前期与制作的桥梁。' },
        pts: { en: ['Storyboard frames become image-to-video inputs', 'Plan coverage: wide, medium, close-up', 'Lock the look before animating'], zh: ['分镜画面直接作为图生视频的输入', '规划景别覆盖：全景、中景、特写', '先锁定画面风格，再做动态'] } },
      { id: 's4', src: { t: 'own' }, dur: '—', by: 'NexVibes Faculty',
        title: { en: 'Studio session: the writers’ room with AI', zh: '工作室课：和 AI 一起开编剧会' },
        sum: { en: 'Original NexVibes lesson with a working screenwriter: a live session developing one story from idea to treatment.', zh: 'NexVibes 原创课，邀请职业编剧现场演示：把一个故事从灵感发展到大纲。' },
        pts: { en: ['Coming soon — recording in progress', 'Downloadable treatment template', 'Guest screenwriter TBA'], zh: ['即将上线——录制中', '可下载的大纲模板', '客座编剧待定'] } }
    ],
    task: { en: 'Write a one-page treatment for a 1-minute short film and a 6-panel storyboard. Mark clearly which parts AI helped with.', zh: '为一部 1 分钟短片写一页故事大纲和 6 格分镜，清楚标注哪些部分使用了 AI 辅助。' }
  },

  /* ---------------- DESIGN ---------------- */
  {
    id: 'adobe-ai', cat: 'design', level: 'beginner', access: 'campus', credits: 1, hours: 3, kind: 'pro',
    title: { en: 'Generative AI in the Adobe Workflow', zh: 'Adobe 工作流中的生成式 AI' },
    sub: { en: 'Firefly and Photoshop’s Generative Fill inside the tools the industry already uses.', zh: '在行业已经在用的工具里使用 Firefly 和 Photoshop 创成式填充。' },
    outcomes: { en: ['Extend, remove and replace with Generative Fill', 'Create commercially safe assets with Firefly', 'Combine AI with traditional retouching'], zh: ['用创成式填充扩图、移除、替换', '用 Firefly 生成可商用素材', '把 AI 与传统修图结合'] },
    lessons: [
      { id: 'd1', src: { t: 'yt', id: 'Gni6gzKrXzY' }, dur: '29:33', by: 'Darren Meredith',
        title: { en: 'Adobe Firefly: a beginner’s guide', zh: 'Adobe Firefly 新手指南' },
        sum: { en: 'A tour of Firefly’s image, video and vector tools and how they connect to Creative Cloud apps.', zh: '浏览 Firefly 的图像、视频和矢量工具，以及它们与 Creative Cloud 各软件的联动。' },
        pts: { en: ['Firefly models are trained for commercial safety', 'Style and structure references', 'Send results straight into Photoshop or Premiere'], zh: ['Firefly 模型以商用安全为训练原则', '风格参考与结构参考', '结果可直接发送到 Photoshop 或 Premiere'] } },
      { id: 'd2', src: { t: 'yt', id: 'SB60EQG2HyE' }, dur: '21:48', by: 'Brendan Williams',
        title: { en: 'Photoshop Generative Fill — the ultimate guide', zh: 'Photoshop 创成式填充终极指南' },
        sum: { en: 'Practical retouching and compositing with Generative Fill and Generative Expand.', zh: '用创成式填充和创成式扩展做实用的修图与合成。' },
        pts: { en: ['Selections drive the result', 'Empty prompts can work for removal', 'Blend AI layers with masks and adjustments'], zh: ['选区决定结果', '移除物体时可以不写提示词', '用蒙版和调整图层融合 AI 图层'] } }
    ],
    task: { en: 'Take one of your own photos and create three versions with Generative Fill: extended, cleaned and re-imagined.', zh: '选一张你自己拍的照片，用创成式填充做三个版本：扩图版、净化版、重新想象版。' }
  },

  /* ---------------- FILM ---------------- */
  {
    id: 'short-film', cat: 'film', level: 'intermediate', access: 'campus', credits: 3, hours: 10, featured: true, kind: 'pro', capstone: true,
    title: { en: 'AI Short Film Production (Capstone)', zh: 'AI 短片制作（毕业项目课）' },
    sub: { en: 'The full pipeline — script, design, consistent characters, shots, lip sync, sound and edit — ending in your own AI short film.', zh: '完整流程——剧本、美术、角色一致性、镜头、口型同步、声音、剪辑——最终完成你自己的 AI 短片。' },
    outcomes: { en: ['Run a complete AI film production', 'Keep characters consistent across a whole film', 'Lip-sync dialogue convincingly', 'Present work at a festival-ready standard'], zh: ['完整执行一次 AI 影片制作', '在整部片子里保持角色一致', '做出可信的对白口型同步', '以影展标准呈现作品'] },
    lessons: [
      { id: 'sf1', src: { t: 'yt', id: 'TM8hd2lnrEk' }, dur: '15:27', by: 'Runway',
        title: { en: 'Creating an AI short film — full workflow', zh: 'AI 短片制作全流程' },
        sum: { en: 'Runway’s own team walks through a complete short film from concept to final cut.', zh: 'Runway 官方团队演示一部短片从概念到成片的全过程。' },
        pts: { en: ['Concept → look development → shots → edit', 'Build a visual bible before generating', 'Editing is where the film is made'], zh: ['概念 → 视觉开发 → 镜头 → 剪辑', '生成前先建立视觉设定集', '电影是在剪辑台上完成的'] } },
      { id: 'sf2', src: { t: 'yt', id: '0v534yAyhwg' }, dur: '16:50', by: 'Youri van Hofwegen',
        title: { en: 'Exactly how to make an AI short film', zh: '手把手做一部 AI 短片' },
        sum: { en: 'An independent creator’s practical pipeline, tool by tool, with honest notes on what still goes wrong.', zh: '一位独立创作者的实用流程，逐个工具讲解，也坦诚说明哪些地方仍然容易出问题。' },
        pts: { en: ['Image first, then animate', 'Upscale and frame-interpolate for polish', 'Sound design sells the realism'], zh: ['先做图，再做动态', '放大和补帧让画面更精致', '声音设计决定真实感'] } },
      { id: 'sf3', src: { t: 'yt', id: 'dOmKYJoRboE' }, dur: '13:34', by: 'Isa does AI',
        title: { en: 'Long AI videos with consistent characters', zh: '长视频中的角色一致性' },
        sum: { en: 'The hardest problem in AI film: keeping the same face, costume and world across dozens of shots.', zh: 'AI 电影最难的问题：在几十个镜头里保持同一张脸、同一套服装和同一个世界。' },
        pts: { en: ['Character sheets from multiple angles', 'Reference images in every generation', 'Continuity checklist per shot'], zh: ['多角度角色设定图', '每次生成都带参考图', '每个镜头都过一遍连贯性清单'] } },
      { id: 'sf4', src: { t: 'yt', id: 'HJs1-R1FDdk' }, dur: '9:21', by: 'Isa does AI',
        title: { en: 'Lip-sync AI videos accurately', zh: '精准的 AI 口型同步' },
        sum: { en: 'Making characters speak: tools and techniques for natural dialogue scenes.', zh: '让角色开口说话：自然对白场景的工具与技巧。' },
        pts: { en: ['Clean audio first', 'Medium shots sync better than extreme close-ups', 'Check every syllable at 50% speed'], zh: ['先准备干净的音频', '中景比大特写更容易同步', '用 0.5 倍速逐音节检查'] } },
      { id: 'sf5', src: { t: 'bili', id: 'BV12hXrBoE9G' }, dur: '13:19', by: 'bilibili AI Creator MeetUP',
        title: { en: 'An AI animator’s complete process (Chinese talk)', zh: 'AI 动画创作全流程分享（中文讲座）' },
        sum: { en: 'A Chinese creator shares the full process behind a popular AI animation at a Bilibili creator meetup.', zh: 'B 站 AI 创作者 MeetUP 现场，UP 主分享一部热门 AI 动画背后的完整制作流程。' },
        pts: { en: ['Real production decisions and trade-offs', 'Audience perspective from Chinese platforms', 'Bilingual case study'], zh: ['真实的制作决策与取舍', '中文平台的观众视角', '双语对照案例'] } },
      { id: 'sf6', src: { t: 'own' }, dur: '—', by: 'NexVibes Faculty',
        title: { en: 'Capstone critique: screening & feedback', zh: '结业评审：放映与点评' },
        sum: { en: 'Final cohort screening. Faculty and industry guests review student films live (held on Zoom, recording posted here).', zh: '期末集体放映：讲师与业界嘉宾现场点评学生作品（通过 Zoom 进行，录像会上传到这里）。' },
        pts: { en: ['Live session via Zoom / Tencent Meeting', 'Recording uploaded after the session', 'Best films featured in the Showcase'], zh: ['通过 Zoom / 腾讯会议直播', '结束后上传录像', '优秀作品进入作品展'] } }
    ],
    task: { en: 'Capstone: a 60–90 second AI short film with a clear story, consistent characters, sound design and a 1-page process document.', zh: '毕业项目：一部 60–90 秒的 AI 短片，要求故事清晰、角色一致、有声音设计，并附 1 页制作过程说明。' }
  },
  {
    id: 'music-video', cat: 'film', level: 'intermediate', access: 'premium', credits: 1, hours: 3, kind: 'workshop',
    title: { en: 'Workshop: Make an AI Music Video', zh: '工作坊：做一支 AI 音乐 MV' },
    sub: { en: 'Song with Suno, visuals with image and video models, edited to the beat.', zh: '用 Suno 写歌，用图像与视频模型做画面，再卡点剪辑。' },
    outcomes: { en: ['Plan visuals from a song’s structure', 'Edit to rhythm', 'Deliver a vertical and a horizontal cut'], zh: ['根据歌曲结构规划画面', '按节奏剪辑', '交付竖屏与横屏两个版本'] },
    lessons: [
      { id: 'mv1', src: { t: 'yt', id: 'M7p7HrJjcdA' }, dur: '18:58', by: 'Tao Prompts',
        title: { en: 'A professional music video with AI', zh: '用 AI 做一支专业 MV' },
        sum: { en: 'Breaking a song into sections and designing a visual idea for each — then generating and cutting it together.', zh: '把歌曲拆成段落，为每一段设计视觉概念——然后生成并剪在一起。' },
        pts: { en: ['Verse, chorus and bridge each get a look', 'Cut on the beat', 'Performance shots vs. story shots'], zh: ['主歌、副歌、桥段各有自己的视觉', '踩着节拍剪', '表演镜头与叙事镜头的搭配'] } },
      { id: 'mv2', src: { t: 'yt', id: '7ajVhp8qM3U' }, dur: '8:51', by: 'Isa does AI',
        title: { en: 'AI music videos with perfect lip sync', zh: '口型完美同步的 AI MV' },
        sum: { en: 'Making an AI singer perform your track convincingly.', zh: '让 AI 歌手可信地“演唱”你的歌。' },
        pts: { en: ['Isolate vocals before syncing', 'Short phrases sync more reliably', 'Mix close-ups with wide shots'], zh: ['同步前先分离人声', '短句更容易同步', '特写与全景交替使用'] } }
    ],
    task: { en: 'A 30-second music video for an original AI song, in both 9:16 and 16:9.', zh: '为一首 AI 原创歌曲做 30 秒 MV，交付 9:16 和 16:9 两个版本。' }
  },

  /* ---------------- MARKETING ---------------- */
  {
    id: 'ads', cat: 'marketing', level: 'intermediate', access: 'premium', credits: 1.5, hours: 4, kind: 'pro',
    title: { en: 'AI Advertising & Brand Content', zh: 'AI 广告与品牌内容' },
    sub: { en: 'Product photography, cinematic commercials and campaign assets — produced at a fraction of the traditional cost.', zh: '产品摄影、电影感广告片和整套营销物料——以传统成本的一小部分完成。' },
    outcomes: { en: ['Shoot products without a studio', 'Build a 15-second commercial', 'Keep brand identity consistent across assets'], zh: ['不用影棚也能拍产品', '做一支 15 秒广告片', '在所有物料中保持品牌一致'] },
    lessons: [
      { id: 'ad1', src: { t: 'yt', id: 'sMNjQ2Gks_4' }, dur: '16:19', by: 'Dan Kieft',
        title: { en: 'How to create cinematic AI ads', zh: '如何做电影感 AI 广告' },
        sum: { en: 'From brief to finished spot: concept, product shots, motion, sound and edit.', zh: '从需求简报到成片：概念、产品镜头、动态、声音与剪辑。' },
        pts: { en: ['Start from the brand brief', 'Hero product shot first', 'Sound and logo sting at the end'], zh: ['从品牌需求出发', '先做产品主镜头', '结尾加声音和品牌标识'] } },
      { id: 'ad2', src: { t: 'yt', id: '6eG3T-Esp4E' }, dur: '14:41', by: 'Chris Rawlings',
        title: { en: 'AI product photography, step by step', zh: 'AI 产品摄影分步教程' },
        sum: { en: 'Placing a real product into new scenes while keeping labels and shapes accurate.', zh: '把真实产品放进新场景，同时保证标签和外形准确。' },
        pts: { en: ['Use a clean product photo as reference', 'Lighting must match the scene', 'Always check text and logos'], zh: ['用干净的产品照作参考', '光线要和场景匹配', '务必检查文字和 Logo'] } },
      { id: 'ad3', src: { t: 'yt', id: 'P7pH_1zFKbE' }, dur: '11:01', by: 'Dan Kieft',
        title: { en: 'Cinematic ads with Nano Banana + Kling', zh: 'Nano Banana + 可灵 做电影感广告' },
        sum: { en: 'Combining an image editor and a video model for fast, high-quality ad production.', zh: '把图像编辑模型和视频模型结合起来，快速产出高质量广告。' },
        pts: { en: ['Image model for the frames', 'Video model for the motion', 'Editor for pacing and brand'], zh: ['图像模型负责画面', '视频模型负责动态', '剪辑软件负责节奏和品牌'] } }
    ],
    task: { en: 'Create a 15-second ad for a local brand (real or imaginary) plus 3 social media stills.', zh: '为一个本地品牌（真实或虚构）做一支 15 秒广告和 3 张社交媒体图。' }
  },

  /* ---------------- BUILD ---------------- */
  {
    id: 'vibe-coding', cat: 'build', level: 'beginner', access: 'free', credits: 1.5, hours: 5, featured: true, kind: 'general',
    title: { en: 'Vibe Coding: Build Websites & Tools with AI', zh: 'Vibe Coding：用 AI 做网站和工具' },
    sub: { en: 'No CS degree needed. Describe what you want, and build your portfolio site, interactive stories or creative tools with AI coding agents.', zh: '不需要计算机学位。描述你想要什么，借助 AI 编程助手做出作品集网站、互动故事或创意小工具。' },
    outcomes: { en: ['Build and publish a personal portfolio website', 'Work with an AI coding agent effectively', 'Understand enough code to steer the AI'], zh: ['做出并发布个人作品集网站', '高效地与 AI 编程助手协作', '懂得足够的代码知识来“驾驭”AI'] },
    lessons: [
      { id: 'b1', src: { t: 'yt', id: 'iLCDSY2XX7E' }, dur: '33:23', by: 'Tina Huang',
        title: { en: 'Vibe coding fundamentals in 33 minutes', zh: '33 分钟学会 Vibe Coding 基础' },
        sum: { en: 'What vibe coding is, the tools available, and a framework for turning an idea into a working app.', zh: '什么是 Vibe Coding、有哪些工具，以及把一个想法变成可用应用的方法框架。' },
        pts: { en: ['Write a mini “product spec” first', 'Build in small steps and test often', 'Use version control so you can undo'], zh: ['先写一份迷你“产品说明”', '小步构建、频繁测试', '用版本管理，随时可以撤销'] } },
      { id: 'b2', src: { t: 'yt', id: '-VuZmoc-Sq8' }, dur: '33:33', by: 'Metics Media',
        title: { en: 'The ultimate beginner’s guide to vibe coding', zh: 'Vibe Coding 新手终极指南' },
        sum: { en: 'A complete build from blank page to live website using AI app builders.', zh: '用 AI 应用构建工具，从空白页面到上线网站的完整演示。' },
        pts: { en: ['Pick a tool: browser builders vs. code agents', 'Design with references and screenshots', 'Deploy and share a live link'], zh: ['选工具：浏览器构建器 vs 编程智能体', '用参考图和截图来描述设计', '部署并分享在线链接'] } },
      { id: 'b3', src: { t: 'yt', id: 'ntDIxaeo3Wg' }, dur: '35:49', by: 'Tech With Tim', alt: { t: 'bili', id: 'BV1NvRyBzEhq', label: 'Claude Code 中文教程' },
        title: { en: 'Claude Code — full tutorial for beginners', zh: 'Claude Code 新手完整教程' },
        sum: { en: 'An AI agent that works in your project folder: reading files, writing code, running it and fixing errors.', zh: '一个在你的项目文件夹里工作的 AI 智能体：读文件、写代码、运行并修复错误。' },
        pts: { en: ['Describe outcomes, not code', 'Let the agent run and check its own work', 'Review changes before you keep them'], zh: ['描述你想要的结果，而不是代码', '让智能体自己运行和检查', '保留修改前先审查'] } }
    ],
    task: { en: 'Build and publish a one-page portfolio site that shows three of your AI works. Submit the live URL.', zh: '做并发布一个单页作品集网站，展示你的三件 AI 作品，提交在线网址。' }
  },

  /* ---------------- ORIGINALS (placeholder) ---------------- */
  {
    id: 'originals-vibe', cat: 'film', level: 'intermediate', access: 'campus', credits: 2, hours: 8, kind: 'original', comingSoon: true,
    title: { en: 'NexVibes Original: Directing the Vibe', zh: 'NexVibes 原创课：导演你的 Vibe' },
    sub: { en: 'Our flagship original course. When technology is no longer the barrier, what remains is taste: story, rhythm, emotion and aesthetic. Recorded with industry directors.', zh: '我们的旗舰原创课程。当技术不再是门槛，剩下的就是审美：故事、节奏、情绪与调性。与业界导演合作录制。' },
    outcomes: { en: ['Find the emotional core of a story', 'Control rhythm and pacing', 'Build a personal aesthetic', 'Critique AI work like a director'], zh: ['找到故事的情绪内核', '掌控节奏与叙事步调', '建立个人审美调性', '像导演一样点评 AI 作品'] },
    lessons: [
      { id: 'o1', src: { t: 'own' }, dur: '—', by: 'NexVibes', title: { en: 'Module 1 · What is a “Vibe”?', zh: '第 1 单元 · 什么是 Vibe？' }, sum: { en: 'Recording in progress.', zh: '录制中。' }, pts: { en: [], zh: [] } },
      { id: 'o2', src: { t: 'own' }, dur: '—', by: 'NexVibes', title: { en: 'Module 2 · Story core & emotional arc', zh: '第 2 单元 · 故事内核与情绪弧线' }, sum: { en: 'Recording in progress.', zh: '录制中。' }, pts: { en: [], zh: [] } },
      { id: 'o3', src: { t: 'own' }, dur: '—', by: 'NexVibes', title: { en: 'Module 3 · Rhythm, pacing and the cut', zh: '第 3 单元 · 节奏、步调与剪辑点' }, sum: { en: 'Recording in progress.', zh: '录制中。' }, pts: { en: [], zh: [] } },
      { id: 'o4', src: { t: 'own' }, dur: '—', by: 'NexVibes', title: { en: 'Module 4 · Building your aesthetic signature', zh: '第 4 单元 · 建立你的审美签名' }, sum: { en: 'Recording in progress.', zh: '录制中。' }, pts: { en: [], zh: [] } },
      { id: 'o5', src: { t: 'own' }, dur: '—', by: 'NexVibes', title: { en: 'Module 5 · Cultural resonance across borders', zh: '第 5 单元 · 跨越国界的文化共鸣' }, sum: { en: 'Recording in progress.', zh: '录制中。' }, pts: { en: [], zh: [] } }
    ],
    task: { en: 'To be announced.', zh: '待公布。' }
  }
];

const LECTURES = [
  { id: 'lec-karpathy', src: { t: 'yt', id: 'zjkBMFhNj_g' }, dur: '59:48', speaker: 'Andrej Karpathy', role: { en: 'Founding member, OpenAI', zh: 'OpenAI 创始成员' },
    title: { en: 'Intro to Large Language Models', zh: '大语言模型入门' }, tag: { en: 'Keynote', zh: '主题演讲' } },
  { id: 'lec-deepdive', src: { t: 'yt', id: '7xTGNNLPyMI' }, dur: '3:31:24', speaker: 'Andrej Karpathy', role: { en: 'AI researcher & educator', zh: 'AI 研究者与教育者' },
    title: { en: 'Deep Dive into LLMs like ChatGPT', zh: '深入理解 ChatGPT 这类大模型' }, tag: { en: 'Masterclass', zh: '大师课' } },
  { id: 'lec-nn', src: { t: 'yt', id: 'aircAruvnKk' }, dur: '18:40', speaker: '3Blue1Brown', role: { en: 'Grant Sanderson, math educator', zh: 'Grant Sanderson，数学科普作者' },
    title: { en: 'But what is a neural network?', zh: '神经网络到底是什么？' }, tag: { en: 'Visual explainer', zh: '可视化讲解' } },
  { id: 'lec-attn', src: { t: 'yt', id: 'eMlx5fFNoYc' }, dur: '26:10', speaker: '3Blue1Brown', role: { en: 'Grant Sanderson, math educator', zh: 'Grant Sanderson，数学科普作者' },
    title: { en: 'Attention in transformers, step by step', zh: '一步步看懂 Transformer 的注意力机制' }, tag: { en: 'Visual explainer', zh: '可视化讲解' } },
  { id: 'lec-limu', src: { t: 'bili', id: 'BV1pu411o7BE' }, dur: '1:27:05', speaker: '李沐 Mu Li', role: { en: 'AI scientist, “Dive into Deep Learning”', zh: 'AI 科学家，《动手学深度学习》作者' },
    title: { en: 'Reading the Transformer paper, paragraph by paragraph', zh: 'Transformer 论文逐段精读' }, tag: { en: 'Chinese lecture', zh: '中文讲座' } },
  { id: 'lec-flow', src: { t: 'yt', id: '9nVEfjmDlVk' }, dur: '2:53', speaker: 'Google', role: { en: 'Google Labs', zh: '谷歌实验室' },
    title: { en: 'Creating in Flow: Google’s AI filmmaking tool', zh: '在 Flow 中创作：谷歌的 AI 电影工具' }, tag: { en: 'Industry', zh: '行业' } },
  { id: 'lec-guest1', src: { t: 'own' }, dur: '—', speaker: { en: 'Guest director (TBA)', zh: '客座导演（待定）' }, role: { en: 'NexVibes Guest Lecture Series', zh: 'NexVibes 客座讲座系列' },
    title: { en: 'AI in the Film Industry: What Changes, What Doesn’t', zh: 'AI 进入电影行业：什么变了，什么没变' }, tag: { en: 'Upcoming', zh: '即将开讲' }, upcoming: true },
  { id: 'lec-guest2', src: { t: 'own' }, dur: '—', speaker: { en: 'Guest speaker (TBA)', zh: '客座嘉宾（待定）' }, role: { en: 'NexVibes Guest Lecture Series', zh: 'NexVibes 客座讲座系列' },
    title: { en: 'Cultural Resonance: Southeast Asian Stories in the AI Era', zh: '文化共鸣：AI 时代的东南亚故事' }, tag: { en: 'Upcoming', zh: '即将开讲' }, upcoming: true }
];

const ARTICLES = [
  {
    id: 'own-the-vibe', cat: 'foundations', read: 5, date: '2026-11-18', cover: ['#5541DC', '#5FD9B0'],
    title: { en: 'Own the Vibe: What Media Education Should Teach in the AI Era', zh: '把握 Vibe：AI 时代的传媒教育该教什么' },
    excerpt: { en: 'For decades, students spent years mastering software. Now the render belongs to AI — and the vibe belongs to them.', zh: '几十年来，学生要花好几年去死磕软件。现在，渲染交给 AI——Vibe 留给他们自己。' },
    body: {
      en: [
        ['p', 'For a generation of media students, learning the craft meant learning the machine: menus, render pipelines, plug-ins and parameters. Years of study went into becoming fluent in tools that changed every few years anyway.'],
        ['h', 'The barrier has moved'],
        ['p', 'Multimodal AI models now generate images, motion, voice and music from a description. The technical barrier that once separated an idea from a finished piece has dropped dramatically. That does not make craft irrelevant — it changes where craft lives.'],
        ['h', 'What remains is taste'],
        ['p', 'When anyone can generate a beautiful frame, the scarce skill is knowing which frame matters. The core competence of the next generation of artists is not operating software. It is controlling the inner core of a story, the rhythm of sound and picture, the tension of emotion and the tone of an aesthetic — in short, the Vibe.'],
        ['quote', 'Leave the technical generation to AI. Let young creators return to aesthetics, creativity and storytelling — and define the next wave of audiovisual culture.'],
        ['h', 'Why “NexVibes”'],
        ['p', '“Nex” stands for Next — the next generation. “Vibes” stands for creative rhythm, aesthetic intuition and cultural resonance. Languages differ, but the emotion carried by great audiovisual work crosses borders. That is why we build for universities across Southeast Asia and beyond.']
      ],
      zh: [
        ['p', '对好几代传媒学生来说，学手艺就等于学机器：菜单、渲染管线、插件和参数。他们花好几年去熟练掌握那些每隔几年就会被淘汰的工具。'],
        ['h', '门槛已经移动'],
        ['p', '多模态 AI 模型现在可以根据一段描述生成图像、动态、声音和音乐。曾经横在“想法”和“成品”之间的技术门槛被极大地抹平了。这并不意味着手艺不再重要——而是手艺的位置变了。'],
        ['h', '剩下的是审美'],
        ['p', '当人人都能生成一帧好看的画面，稀缺的能力就变成了：知道哪一帧真正重要。下一代艺术与传媒学生的核心竞争力，不再是“当一个熟练的软件操作工”，而是把控故事的内核、视听的节奏、情绪的张力与审美的调性——也就是把控作品的 Vibe。'],
        ['quote', '把底层的技术生成交给 AI，让青年创作者回归审美、创意与叙事本身，去定义属于下一代的视听浪潮。'],
        ['h', '为什么叫 NexVibes'],
        ['p', '“Nex”代表 Next，下一代；“Vibes”代表创意律动、审美直觉与文化共鸣。语言或许不同，但优质视听内容所传递的情绪是无国界的。这正是我们走进东南亚乃至全球高校的原因。']
      ]
    }
  },
  {
    id: 'creator-stack', cat: 'foundations', read: 6, date: '2026-11-12', cover: ['#1C1650', '#5541DC'],
    title: { en: 'The AI Creator Stack: Tools Mapped to Every Stage of Production', zh: 'AI 创作者工具栈：按制作阶段整理的工具地图' },
    excerpt: { en: 'Development, pre-production, production, post. Which AI tools belong where — and which skills matter at each step.', zh: '开发、前期、制作、后期——每个阶段该用哪些 AI 工具，又需要哪些能力。' },
    body: {
      en: [
        ['p', 'Students are often overwhelmed by the number of AI tools. A simple fix: map them to the production stages you already know from film school.'],
        ['h', '1 · Development'],
        ['p', 'Research and ideation: chat assistants (ChatGPT, Claude, Gemini, DeepSeek) for brainstorming and structure; NotebookLM for source-grounded research. Skill that matters: asking good questions.'],
        ['h', '2 · Pre-production'],
        ['p', 'Look development and storyboards: Midjourney, Nano Banana, Flux, Jimeng, Firefly. Skill that matters: visual vocabulary — shot size, lens, light, colour.'],
        ['h', '3 · Production'],
        ['p', 'Shots: MiniMax Hailuo, Kling, Runway, Veo, Sora, Seedance. Voice: MiniMax Audio, ElevenLabs. Music: Suno. Skill that matters: directing — knowing what the shot must make the audience feel.'],
        ['h', '4 · Post-production'],
        ['p', 'Editing, upscaling, lip sync and finishing: CapCut, DaVinci Resolve, Premiere with Firefly, ComfyUI pipelines. Skill that matters: rhythm.'],
        ['quote', 'Tools change every quarter. Production stages — and the judgement each one needs — do not.']
      ],
      zh: [
        ['p', '学生常常被数不清的 AI 工具搞得眼花缭乱。一个简单的办法：把它们对应到电影学院早就教过的制作阶段。'],
        ['h', '1 · 开发阶段'],
        ['p', '调研与构思：用对话助手（ChatGPT、Claude、Gemini、DeepSeek）头脑风暴、梳理结构；用 NotebookLM 做基于资料的研究。关键能力：会提问。'],
        ['h', '2 · 前期'],
        ['p', '视觉开发与分镜：Midjourney、Nano Banana、Flux、即梦、Firefly。关键能力：视觉语言——景别、镜头、光线、色彩。'],
        ['h', '3 · 制作'],
        ['p', '镜头：MiniMax 海螺、可灵、Runway、Veo、Sora、Seedance；配音：MiniMax Audio、ElevenLabs；音乐：Suno。关键能力：导演意识——知道这个镜头要让观众感受到什么。'],
        ['h', '4 · 后期'],
        ['p', '剪辑、放大、口型同步与成片：剪映、DaVinci Resolve、Premiere + Firefly、ComfyUI 管线。关键能力：节奏感。'],
        ['quote', '工具每个季度都在变，制作阶段——以及每个阶段需要的判断力——不会变。']
      ]
    }
  },
  {
    id: 'cinematographer-prompts', cat: 'video', read: 4, date: '2026-11-05', cover: ['#0E3B3A', '#5FD9B0'],
    title: { en: 'Prompt Like a Cinematographer: A Cheat Sheet', zh: '像摄影指导一样写提示词：速查表' },
    excerpt: { en: 'Shot size, lens, light, movement and mood — the five layers of a cinematic prompt.', zh: '景别、镜头、光线、运镜、氛围——电影感提示词的五个层次。' },
    body: {
      en: [
        ['p', 'Generic prompts give generic images. Cinematographers think in layers. Borrow their checklist.'],
        ['h', 'The five layers'],
        ['list', ['Shot size — extreme wide, wide, medium, close-up, extreme close-up', 'Lens — 24mm wide-angle, 50mm natural, 85mm portrait, macro, anamorphic', 'Light — golden hour, overcast soft light, hard noon sun, neon practicals, candlelight, rim light', 'Movement — static, slow dolly-in, crane up, orbit, handheld, whip pan', 'Mood — melancholic, tense, dreamlike, euphoric, quiet']],
        ['h', 'Example'],
        ['code', 'Medium close-up, 85mm lens, shallow depth of field. A young woman on a night ferry in Penang, wind in her hair, neon reflections on the water. Soft rim light, teal and amber palette. Slow dolly-in. Quiet, nostalgic mood.'],
        ['p', 'Change one layer at a time when you iterate — that is how you learn what each one does.']
      ],
      zh: [
        ['p', '笼统的提示词只会得到笼统的画面。摄影指导是分层思考的，借用他们的清单吧。'],
        ['h', '五个层次'],
        ['list', ['景别——大远景、全景、中景、近景、特写', '镜头——24mm 广角、50mm 标准、85mm 人像、微距、变形宽银幕', '光线——黄金时刻、阴天柔光、正午硬光、霓虹实景光、烛光、轮廓光', '运镜——固定、缓慢推进、升镜、环绕、手持、甩镜', '氛围——忧郁、紧张、梦幻、狂喜、安静']],
        ['h', '示例'],
        ['code', '中近景，85mm 镜头，浅景深。槟城夜渡轮上的年轻女子，风吹起她的头发，水面倒映着霓虹。柔和的轮廓光，青色与琥珀色调。缓慢推镜。安静、怀旧的氛围。'],
        ['p', '迭代时一次只改一个层次——这样你才能真正理解每一层的作用。']
      ]
    }
  },
  {
    id: 'responsible-ai', cat: 'foundations', read: 5, date: '2026-10-28', cover: ['#3A1C5C', '#B794F6'],
    title: { en: 'Using Generative AI Responsibly: Copyright, Consent and Disclosure', zh: '负责任地使用生成式 AI：版权、授权与披露' },
    excerpt: { en: 'A practical guide for students: what you may use, whose likeness you may not, and how to disclose AI use honestly.', zh: '给学生的实用指南：哪些可以用、谁的肖像不能用、如何诚实地说明 AI 的使用。' },
    body: {
      en: [
        ['p', 'Creative freedom comes with responsibility. These are the house rules we recommend for every NexVibes course.'],
        ['h', 'Consent'],
        ['list', ['Never clone a real person’s voice or face without their written consent', 'Do not create content that could deceive people about real events', 'Be extra careful with public figures, minors and private individuals']],
        ['h', 'Copyright'],
        ['list', ['Read each tool’s terms — commercial-use rights differ', 'Do not prompt for living artists’ names to imitate their style in commercial work', 'Credit sources and references you used']],
        ['h', 'Disclosure'],
        ['p', 'Every submitted assignment includes a short “AI use statement”: which tools you used, for which parts, and what you made yourself. This is not a penalty — it is how professionals work, and it lets teachers grade your judgement, not just your output.'],
        ['quote', 'Note: laws differ by country and change quickly. This is guidance for coursework, not legal advice.']
      ],
      zh: [
        ['p', '创作自由伴随着责任。以下是我们建议在每门 NexVibes 课程中遵守的“课堂规则”。'],
        ['h', '授权'],
        ['list', ['未经本人书面同意，不克隆任何真实人物的声音或面孔', '不制作可能让人误以为是真实事件的内容', '涉及公众人物、未成年人和普通个人时要格外谨慎']],
        ['h', '版权'],
        ['list', ['阅读每个工具的条款——商用权利各不相同', '商业作品中不要用在世艺术家的名字去模仿其风格', '注明你使用的资料来源和参考'] ],
        ['h', '披露'],
        ['p', '每份提交的作业都附一段简短的“AI 使用说明”：用了哪些工具、用在哪些部分、哪些是你自己完成的。这不是扣分项——这是专业人士的工作方式，也让老师能评价你的判断力，而不仅仅是产出。'],
        ['quote', '注意：各国法律不同且变化很快。本文是课程作业指引，不构成法律意见。']
      ]
    }
  },
  {
    id: 'grading-ai-work', cat: 'foundations', read: 4, date: '2026-10-20', cover: ['#5541DC', '#F2B8A0'],
    title: { en: 'For Educators: How to Grade AI-Assisted Creative Work', zh: '写给老师：如何评价 AI 辅助的创作作业' },
    excerpt: { en: 'If AI can produce the output, grade the decisions. A four-part rubric used across NexVibes courses.', zh: '既然 AI 能生成结果，那就评价“决策”。NexVibes 课程通用的四维评分标准。' },
    body: {
      en: [
        ['p', 'When a polished image takes ten seconds, the polish itself tells a teacher very little. What students can still be assessed on is the quality of their decisions.'],
        ['h', 'The NexVibes rubric'],
        ['list', ['Creative concept (30%) — is there a clear idea, story or point of view?', 'Technical execution (30%) — are tools used with control, consistency and care?', 'Aesthetic & Vibe (25%) — rhythm, mood, tone; does it make you feel something?', 'Process & reflection (15%) — prompts, iterations and an honest AI-use statement']],
        ['h', 'In the platform'],
        ['p', 'Teachers can attach this rubric to any assignment, score each criterion, leave written feedback and return work to students in one place. Students see their scores, comments and the rubric breakdown on their dashboard.']
      ],
      zh: [
        ['p', '当一张精致的图只需要十秒钟，“精致”本身已经无法说明什么。老师仍然可以评价的，是学生决策的质量。'],
        ['h', 'NexVibes 评分标准'],
        ['list', ['创意概念（30%）——是否有清晰的想法、故事或观点？', '技术执行（30%）——工具使用是否可控、一致、用心？', '审美与 Vibe（25%）——节奏、氛围、调性；它是否打动了你？', '过程与反思（15%）——提示词、迭代记录和诚实的 AI 使用说明']],
        ['h', '在平台中'],
        ['p', '老师可以给任何作业挂上这套评分标准，逐项打分、写评语，并在同一个地方把作业返还给学生。学生在自己的学习主页就能看到分数、评语和各维度得分。']
      ]
    }
  }
];

const TOOLS = [
  { n: 'ChatGPT', by: 'OpenAI', cat: 'foundations', url: 'https://chatgpt.com', free: true, d: { en: 'General assistant, writing, images', zh: '通用助手、写作、生图' } },
  { n: 'Claude', by: 'Anthropic', cat: 'foundations', url: 'https://claude.ai', free: true, d: { en: 'Writing, analysis, coding', zh: '写作、分析、编程' } },
  { n: 'Gemini', by: 'Google', cat: 'foundations', url: 'https://gemini.google.com', free: true, d: { en: 'Assistant with Google integration', zh: '与谷歌生态打通的助手' } },
  { n: 'DeepSeek', by: 'DeepSeek', cat: 'foundations', url: 'https://www.deepseek.com', free: true, d: { en: 'Reasoning model, strong in Chinese', zh: '推理模型，中文能力强' } },
  { n: 'NotebookLM', by: 'Google', cat: 'foundations', url: 'https://notebooklm.google.com', free: true, d: { en: 'Source-grounded research', zh: '基于资料的研究笔记' } },
  { n: 'Midjourney', by: 'Midjourney', cat: 'image', url: 'https://www.midjourney.com', free: false, d: { en: 'Artistic image generation', zh: '艺术感图像生成' } },
  { n: 'Nano Banana', by: 'Google Gemini', cat: 'image', url: 'https://gemini.google.com', free: true, d: { en: 'Conversational image editing', zh: '对话式修图' } },
  { n: 'Flux', by: 'Black Forest Labs', cat: 'image', url: 'https://bfl.ai', free: true, d: { en: 'Open-weight image model', zh: '开放权重图像模型' } },
  { n: 'Jimeng 即梦', by: 'ByteDance', cat: 'image', url: 'https://jimeng.jianying.com', free: true, d: { en: 'Image & video, Chinese ecosystem', zh: '图像与视频，中文生态' } },
  { n: 'ComfyUI', by: 'Comfy Org', cat: 'image', url: 'https://www.comfy.org', free: true, d: { en: 'Node-based pipelines', zh: '节点式工作流' } },
  { n: 'Hailuo 海螺', by: 'MiniMax', cat: 'video', url: 'https://hailuoai.video', free: true, d: { en: 'Text & image to video', zh: '文生 / 图生视频' } },
  { n: 'Kling 可灵', by: 'Kuaishou', cat: 'video', url: 'https://klingai.com', free: true, d: { en: 'High-motion video generation', zh: '大幅度运动的视频生成' } },
  { n: 'Runway', by: 'Runway', cat: 'video', url: 'https://runwayml.com', free: true, d: { en: 'Video generation & editing suite', zh: '视频生成与编辑套件' } },
  { n: 'Veo / Flow', by: 'Google', cat: 'video', url: 'https://labs.google/flow', free: false, d: { en: 'Video with native audio', zh: '自带音频的视频生成' } },
  { n: 'Sora', by: 'OpenAI', cat: 'video', url: 'https://sora.com', free: false, d: { en: 'Physics-aware video', zh: '物理感强的视频' } },
  { n: 'MiniMax Audio', by: 'MiniMax', cat: 'audio', url: 'https://www.minimax.io/audio', free: true, d: { en: 'Expressive multilingual speech', zh: '多语种、有情绪的语音' } },
  { n: 'ElevenLabs', by: 'ElevenLabs', cat: 'audio', url: 'https://elevenlabs.io', free: true, d: { en: 'Voice, dubbing, sound effects', zh: '配音、翻译配音、音效' } },
  { n: 'Suno', by: 'Suno', cat: 'audio', url: 'https://suno.com', free: true, d: { en: 'Full songs from a prompt', zh: '一句话生成整首歌' } },
  { n: 'Adobe Firefly', by: 'Adobe', cat: 'design', url: 'https://firefly.adobe.com', free: true, d: { en: 'Commercially safe generation', zh: '可商用的生成工具' } },
  { n: 'CapCut 剪映', by: 'ByteDance', cat: 'design', url: 'https://www.capcut.com', free: true, d: { en: 'Editing with AI features', zh: '带 AI 功能的剪辑' } },
  { n: 'DaVinci Resolve', by: 'Blackmagic', cat: 'design', url: 'https://www.blackmagicdesign.com/products/davinciresolve', free: true, d: { en: 'Pro editing & colour', zh: '专业剪辑与调色' } },
  { n: 'Claude Code', by: 'Anthropic', cat: 'build', url: 'https://claude.com/product/claude-code', free: false, d: { en: 'AI coding agent', zh: 'AI 编程智能体' } },
  { n: 'Cursor', by: 'Anysphere', cat: 'build', url: 'https://cursor.com', free: true, d: { en: 'AI code editor', zh: 'AI 代码编辑器' } },
  { n: 'Lovable', by: 'Lovable', cat: 'build', url: 'https://lovable.dev', free: true, d: { en: 'Build web apps by chatting', zh: '聊天即可构建网页应用' } }
];

/* Showcase – placeholder student works (fictional) */
const SHOWCASE = [
  { t: { en: 'Last Ferry to Georgetown', zh: '开往乔治市的末班渡轮' }, who: 'Aisha R.', uni: 'MMU', course: 'short-film', g: ['#0F2A4A', '#E9A15A'], kind: 'film', dur: '1:12' },
  { t: { en: 'Batik Dreams', zh: '蜡染之梦' }, who: 'Daniel T.', uni: 'MMU', course: 'image-gen', g: ['#5541DC', '#F6C177'], kind: 'image' },
  { t: { en: 'Monsoon Lullaby', zh: '季风摇篮曲' }, who: 'Nur F.', uni: 'Ciputra', course: 'voice-music', g: ['#1B4332', '#95D5B2'], kind: 'audio', dur: '0:58' },
  { t: { en: 'Neon Kopitiam', zh: '霓虹咖啡店' }, who: 'Wei Jie L.', uni: 'MMU', course: 'hailuo', g: ['#2B0F4C', '#FF5FA2'], kind: 'film', dur: '0:15' },
  { t: { en: 'The Shadow Puppeteer', zh: '皮影匠人' }, who: 'Putri A.', uni: 'Ciputra', course: 'story', g: ['#3B1F0F', '#D9A066'], kind: 'board' },
  { t: { en: 'Durian Season — 15s Ad', zh: '榴莲季——15 秒广告' }, who: 'Kevin O.', uni: 'MMU', course: 'ads', g: ['#244F26', '#E8D44D'], kind: 'film', dur: '0:15' },
  { t: { en: 'Portfolio of Small Worlds', zh: '小世界作品集' }, who: 'Mei Ling C.', uni: 'MMU', course: 'vibe-coding', g: ['#13293D', '#5FD9B0'], kind: 'web' },
  { t: { en: 'Rain on Zinc Roofs', zh: '雨落锌板屋顶' }, who: 'Arif H.', uni: 'Ciputra', course: 'music-video', g: ['#1A1A2E', '#7C83FD'], kind: 'film', dur: '0:30' }
];

const PARTNERS = [
  { name: 'Multimedia University (MMU)', country: { en: 'Malaysia', zh: '马来西亚' }, status: 'signed' },
  { name: 'Universitas Ciputra', country: { en: 'Indonesia', zh: '印度尼西亚' }, status: 'talks' },
  { name: { en: 'More universities across Southeast Asia', zh: '更多东南亚高校' }, country: { en: 'In discussion', zh: '洽谈中' }, status: 'talks' }
];

/* ---------------- Demo LMS data ---------------- */
const DEMO_USERS = {
  student: { id: 'u-aisha', name: 'Aisha Rahman', initials: 'AR', title: { en: 'Year 2 · BA Cinematic Arts', zh: '大二 · 电影艺术学士' }, uni: 'Multimedia University' },
  teacher: { id: 'u-lim', name: 'Dr. Lim Wei Ming', initials: 'LW', title: { en: 'Senior Lecturer · Faculty of Cinematic Arts', zh: '高级讲师 · 电影艺术学院' }, uni: 'Multimedia University' },
  admin: { id: 'u-admin', name: 'Faculty Admin', initials: 'FA', title: { en: 'Academic Affairs · Campus License', zh: '教务处 · 校园授权管理员' }, uni: 'Multimedia University' }
};

const CLASS = {
  id: 'aigc101',
  name: { en: 'AIGC Studio 101', zh: 'AIGC 创作工作室 101' },
  uni: 'Multimedia University',
  faculty: { en: 'Faculty of Cinematic Arts', zh: '电影艺术学院' },
  term: { en: 'Trimester 2 · 2026/27', zh: '2026/27 学年 第 2 学期' },
  credits: 3,
  courses: ['foundations', 'prompting', 'image-gen', 'hailuo', 'story', 'voice-music', 'short-film']
};

const CLASSMATES = [
  ['u-aisha', 'Aisha Rahman'], ['u-2', 'Daniel Tan'], ['u-3', 'Nurul Farhana'], ['u-4', 'Lee Wei Jie'], ['u-5', 'Priya Nair'],
  ['u-6', 'Muhammad Arif'], ['u-7', 'Chloe Wong'], ['u-8', 'Kevin Ong'], ['u-9', 'Siti Aminah'], ['u-10', 'Jason Lim'],
  ['u-11', 'Mei Ling Chua'], ['u-12', 'Harith Iskandar'], ['u-13', 'Tan Jia Hui'], ['u-14', 'Ravi Kumar']
];

const RUBRIC = [
  { k: 'concept', w: 30, en: 'Creative concept', zh: '创意概念' },
  { k: 'exec', w: 30, en: 'Technical execution', zh: '技术执行' },
  { k: 'vibe', w: 25, en: 'Aesthetic & Vibe', zh: '审美与 Vibe' },
  { k: 'process', w: 15, en: 'Process & reflection', zh: '过程与反思' }
];
