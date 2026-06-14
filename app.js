const steps = ["首页", "导入素材", "素材分析", "视频目标", "故事线", "粗剪预览", "导出"];

const materials = [
  { id: 1, name: "湖面远景", duration: "8s", type: "风景", tags: ["适合开头"], use: true, tone: "scene" },
  { id: 2, name: "人物出镜", duration: "6s", type: "人物", tags: ["适合主体"], use: true, tone: "people" },
  { id: 3, name: "古城街道", duration: "7s", type: "街道", tags: ["适合主体"], use: true, tone: "street" },
  { id: 4, name: "建筑细节", duration: "5s", type: "建筑", tags: ["适合转场"], use: true, tone: "detail" },
  { id: 5, name: "活动现场", duration: "9s", type: "现场", tags: ["适合主体", "适合亮点"], use: true, tone: "event" },
  { id: 6, name: "重复风景", duration: "6s", type: "重复", tags: ["建议弱化"], use: true, tone: "repeat" },
  { id: 7, name: "模糊片段", duration: "4s", type: "模糊", tags: ["建议删除"], use: false, tone: "blur" },
  { id: 8, name: "结尾远景", duration: "6s", type: "风景", tags: ["适合结尾"], use: true, tone: "scene" }
];

const story = [
  {
    title: "开头",
    material: "湖面远景",
    copy: "清晨的湖面，把云南旅行的一天慢慢打开。",
    duration: "6s"
  },
  {
    title: "发展",
    material: "古城街道、建筑细节",
    copy: "沿着街道往前走，记录古城里轻松自然的节奏。",
    duration: "9s"
  },
  {
    title: "亮点",
    material: "人物出镜、活动现场",
    copy: "最有记忆点的瞬间，是人在现场真实参与的状态。",
    duration: "10s"
  },
  {
    title: "结尾",
    material: "结尾远景",
    copy: "用一个远景收束，把这一天留在画面里。",
    duration: "5s"
  }
];

const state = {
  page: 0,
  loadingText: "",
  goal: "云南旅行的一天",
  platform: "小红书",
  length: "30 秒",
  style: "自然记录",
  ratio: "9:16",
  quality: "1080p",
  captions: "带字幕",
  exportPlatform: "小红书"
};

const app = document.querySelector("#app");
const progress = document.querySelector("#progress");
const toast = document.querySelector("#toast");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalBody = document.querySelector("#modalBody");
const modalTitle = document.querySelector("#modalTitle");
const modalClose = document.querySelector("#modalClose");

function render() {
  renderProgress();

  if (state.loadingText) {
    app.innerHTML = `
      <div class="loading-state">
        <div class="loading-card">
          <div class="spinner"></div>
          <h1>${state.loadingText}</h1>
          <p>正在使用模拟数据生成结果，约 1 秒后进入下一步。</p>
        </div>
      </div>
    `;
    return;
  }

  const views = [
    renderHome,
    renderImport,
    renderAnalysis,
    renderGoal,
    renderStory,
    renderPreview,
    renderExport
  ];

  app.innerHTML = views[state.page]();
  bindPageEvents();
}

function renderProgress() {
  progress.innerHTML = steps.map((step, index) => {
    const cls = index === state.page ? "step active" : index < state.page ? "step done" : "step";
    return `
      <div class="${cls}" data-number="${String(index + 1).padStart(2, "0")}">
        <span>${step}</span>
      </div>
    `;
  }).join("");
}

function renderPageHeader(title, subtitle) {
  return `
    <div class="page-header">
      <p class="eyebrow">StoryCut Flow</p>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">PRD + UI Prototype</p>
        <h1>StoryCut</h1>
        <p class="hero-subtitle">把零散素材变成可修改的视频粗剪</p>
        <p class="hero-desc">面向轻量内容创作者的中低保真产品原型，重点展示从素材导入到粗剪导出的完整产品流程。</p>
        <div class="hero-actions">
          <button class="btn primary" data-action="next">开始创建</button>
          <span class="microcopy">模拟数据 · 不调用真实 AI · 不生成真实视频</span>
        </div>
      </div>

      <aside class="flow-card" aria-label="模拟产品流程卡片">
        <div class="flow-card-head">
          <strong>粗剪流程预览</strong>
          <span>30s draft</span>
        </div>
        <div class="flow-preview">
          <div class="preview-screen">
            <span>云南旅行的一天</span>
          </div>
          <div class="preview-stack">
            <div>素材分析</div>
            <div>故事线确认</div>
            <div>粗剪预览</div>
          </div>
        </div>
      </aside>
    </section>

    <section class="value-grid" aria-label="核心价值">
      ${[
        ["整理素材", "识别素材类型、质量和用途，让用户先理解素材池。"],
        ["生成故事线", "先形成开头、发展、亮点、结尾，再生成粗剪结构。"],
        ["输出可编辑粗剪", "保留修改文案、替换素材和返回调整的空间。"]
      ].map(([title, desc]) => `
        <article class="value-card">
          <span class="value-index">${title.slice(0, 2)}</span>
          <h2>${title}</h2>
          <p>${desc}</p>
        </article>
      `).join("")}
    </section>
  `;
}

function renderImport() {
  return `
    ${renderPageHeader("素材导入", "展示素材进入系统后的第一步，让面试官理解后续分析来自哪些模拟素材。")}
    <button class="upload-box" data-action="upload">
      <strong>点击上传素材</strong>
      <span>当前原型使用 8 段模拟素材，可直接进入分析流程</span>
    </button>
    <div class="section-head">
      <div>
        <h2>已导入素材</h2>
        <p>每张卡片代表一段待分析的视频片段。</p>
      </div>
      <span class="count-badge">${materials.length} clips</span>
    </div>
    <div class="material-grid">${materials.map(renderMaterialCard).join("")}</div>
    ${renderFooterActions("返回上一步", "开始分析素材", "back", "analyze")}
  `;
}

function renderAnalysis() {
  const keepCount = materials.filter(item => item.use).length;
  return `
    ${renderPageHeader("素材分析", "用标签解释系统为什么推荐某些素材，并让用户决定哪些片段进入故事线。")}
    <div class="analysis-layout">
      <div class="material-grid analysis-grid">${materials.map(renderAnalysisCard).join("")}</div>
      <aside class="side-panel">
        <div class="panel-title">
          <span>分析摘要</span>
          <strong>Mock AI</strong>
        </div>
        <p>共识别 8 段素材，建议保留 6 段，1 段重复，1 段画面模糊。</p>
        <div class="metric-grid">
          <div class="metric">
            <span>建议保留素材数</span>
            <strong>${keepCount} 段</strong>
          </div>
          <div class="metric">
            <span>重复/低质素材数</span>
            <strong>2 段</strong>
          </div>
          <div class="metric">
            <span>预计可生成时长</span>
            <strong>30 秒</strong>
          </div>
        </div>
      </aside>
    </div>
    ${renderFooterActions("返回上一步", "下一步", "back", "nextFromAnalysis")}
  `;
}

function renderGoal() {
  return `
    ${renderPageHeader("视频目标", "收集表达目标、平台、时长和风格，用于生成可解释的故事线。")}
    <section class="form-card">
      <div class="field">
        <label for="goalInput">这条视频想表达什么？</label>
        <textarea class="textarea" id="goalInput">${state.goal}</textarea>
        <p class="field-help">示例：云南旅行的一天、活动精彩回顾、周末露营记录。</p>
      </div>
      ${renderChoices("平台选择", "platform", ["小红书", "抖音", "视频号", "B 站"])}
      ${renderChoices("时长选择", "length", ["15 秒", "30 秒", "60 秒"])}
      ${renderChoices("风格选择", "style", ["自然记录", "种草推荐", "活动回顾", "轻快 vlog"])}
    </section>
    ${renderFooterActions("返回上一步", "生成故事线", "back", "generateStory")}
  `;
}

function renderStory() {
  return `
    ${renderPageHeader("故事线确认", "在生成粗剪前先确认叙事结构，避免直接得到不可控的黑盒成片。")}
    <div class="story-layout">
      <div class="story-flow">
        ${story.map((item, index) => `
          <article class="story-card">
            <div class="story-number">${String(index + 1).padStart(2, "0")}</div>
            <div class="story-content">
              <div class="story-head">
                <h2>${item.title}</h2>
                <span>${item.duration}</span>
              </div>
              <div class="story-info">
                <span>使用素材</span>
                <strong>${item.material}</strong>
              </div>
              <div class="story-copy">
                <span>推荐文案</span>
                <p>${item.copy}</p>
              </div>
              <div class="btn-row">
                <button class="btn secondary small" data-action="editCopy" data-index="${index}">修改文案</button>
                <button class="btn secondary small" data-action="replaceMaterial" data-index="${index}">替换素材</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
      <aside class="side-panel story-note">
        <div class="note-label">关键设计点</div>
        <h2>先确认故事线，是为了避免 AI 直接生成不可控成片。</h2>
        <p>StoryCut 把“生成”拆成可理解的步骤：先解释素材，再确认结构，最后进入粗剪预览。</p>
      </aside>
    </div>
    ${renderFooterActions("返回上一步", "生成粗剪", "back", "generatePreview")}
  `;
}

function renderPreview() {
  return `
    ${renderPageHeader("粗剪预览", "展示视频结构、字幕轨道和音乐轨道，说明结果仍然可以继续编辑。")}
    <div class="preview-layout">
      <div>
        <div class="video-player">
          <div class="player-topline">
            <span>StoryCut Preview</span>
            <span>${state.length}</span>
          </div>
          <div class="play-button"></div>
          <h2>${state.goal}</h2>
          <p>${state.platform} · ${state.style}</p>
        </div>
        <div class="timeline">
          ${renderTrack("视频轨道", story.map(item => item.title), "video")}
          ${renderTrack("字幕轨道", story.map(item => `${item.title}字幕`), "subtitle")}
          ${renderTrack("音乐轨道", ["轻快旅行背景音乐"], "music")}
        </div>
      </div>
      <aside class="side-panel edit-panel">
        <div class="panel-title">
          <span>编辑面板</span>
          <strong>Draft</strong>
        </div>
        <button class="btn secondary" data-action="mockEdit">修改字幕</button>
        <button class="btn secondary" data-action="mockEdit">替换片段</button>
        <button class="btn secondary" data-action="mockEdit">调整顺序</button>
        <button class="btn secondary" data-action="backToStory">返回故事线</button>
      </aside>
    </div>
    ${renderFooterActions("返回上一步", "导出视频", "back", "exportVideo")}
  `;
}

function renderExport() {
  return `
    <section class="complete-header">
      <div class="success-icon">✓</div>
      <p class="eyebrow">Export Mock</p>
      <h1>已生成一个可继续编辑的视频粗剪结构</h1>
      <p>这是原型中的模拟导出结果，用于展示产品流程闭环，不会生成真实 mp4。</p>
    </section>
    <section class="export-card">
      ${renderChoices("比例", "ratio", ["9:16", "16:9", "1:1"], true)}
      ${renderChoices("清晰度", "quality", ["720p", "1080p"], true)}
      ${renderChoices("字幕", "captions", ["带字幕", "不带字幕"], true)}
      ${renderChoices("目标平台", "exportPlatform", ["小红书", "抖音", "视频号", "B 站"], true)}
    </section>
    ${renderFooterActions("返回修改", "完成演示", "returnPreview", "finish")}
  `;
}

function renderMaterialCard(item) {
  return `
    <article class="clip-card">
      <div class="thumb ${item.tone}">
        <span>${item.type}</span>
      </div>
      <div class="clip-body">
        <div>
          <h3>${item.name}</h3>
          <span>${item.duration}</span>
        </div>
        <span class="type-pill">${item.type}</span>
      </div>
    </article>
  `;
}

function renderAnalysisCard(item) {
  const tagHtml = item.tags.map(tag => `<span class="${getTagClass(tag)}">${tag}</span>`).join("");
  return `
    <article class="clip-card analysis-card ${item.use ? "" : "muted"}">
      <div class="thumb ${item.tone}">
        <span>${item.type}</span>
      </div>
      <div class="clip-body">
        <div>
          <h3>${item.name}</h3>
          <span>${item.duration}</span>
        </div>
        <div class="tags">${tagHtml}</div>
        <div class="switcher" role="group" aria-label="${item.name} 使用状态">
          <button class="${item.use ? "active keep" : ""}" data-action="toggleMaterial" data-id="${item.id}" data-use="true">保留</button>
          <button class="${item.use ? "" : "active remove"}" data-action="toggleMaterial" data-id="${item.id}" data-use="false">不使用</button>
        </div>
      </div>
    </article>
  `;
}

function getTagClass(tag) {
  if (tag === "建议弱化") return "tag warning";
  if (tag === "建议删除") return "tag danger";
  return "tag";
}

function renderChoices(label, key, choices, asRow = false) {
  const content = `
    <div class="choice-grid">
      ${choices.map(choice => `
        <button class="choice ${state[key] === choice ? "active" : ""}" data-action="choice" data-key="${key}" data-value="${choice}">
          ${choice}
        </button>
      `).join("")}
    </div>
  `;

  if (asRow) {
    return `
      <div class="setting-row">
        <strong>${label}</strong>
        ${content}
      </div>
    `;
  }

  return `
    <div class="field">
      <label>${label}</label>
      ${content}
    </div>
  `;
}

function renderTrack(label, items, type) {
  return `
    <div class="track">
      <div class="track-label">${label}</div>
      <div class="track-items ${type}">
        ${items.map(item => `<div class="clip ${type}">${item}</div>`).join("")}
      </div>
    </div>
  `;
}

function renderFooterActions(backLabel, nextLabel, backAction, nextAction) {
  return `
    <div class="footer-actions">
      <button class="btn secondary" data-action="${backAction}">${backLabel}</button>
      <button class="btn primary" data-action="${nextAction}">${nextLabel}</button>
    </div>
  `;
}

function bindPageEvents() {
  app.querySelectorAll("[data-action]").forEach(element => {
    element.addEventListener("click", event => {
      const target = event.currentTarget;
      const action = target.dataset.action;

      if (action === "next") goTo(state.page + 1);
      if (action === "back") goTo(Math.max(0, state.page - 1));
      if (action === "upload") showToast("原型阶段使用模拟素材，不会打开真实上传窗口。");
      if (action === "analyze") withLoading("正在分析素材", 2);
      if (action === "nextFromAnalysis") nextFromAnalysis();
      if (action === "toggleMaterial") toggleMaterial(Number(target.dataset.id), target.dataset.use === "true");
      if (action === "choice") choose(target.dataset.key, target.dataset.value);
      if (action === "generateStory") generateStory();
      if (action === "editCopy") openCopyModal(Number(target.dataset.index));
      if (action === "replaceMaterial") openMaterialModal(Number(target.dataset.index));
      if (action === "generatePreview") withLoading("正在生成粗剪结构", 5);
      if (action === "mockEdit") showToast("这是作品集原型：编辑动作以流程演示为主。");
      if (action === "backToStory") goTo(4);
      if (action === "exportVideo") goTo(6);
      if (action === "returnPreview") goTo(5);
      if (action === "finish") showToast("演示完成：StoryCut 粗剪结构已生成。");
    });
  });

  const goalInput = document.querySelector("#goalInput");
  if (goalInput) {
    goalInput.addEventListener("input", event => {
      state.goal = event.target.value;
    });
  }
}

function nextFromAnalysis() {
  if (!materials.some(item => item.use)) {
    showToast("请至少保留 1 段素材。");
    return;
  }
  goTo(3);
}

function toggleMaterial(id, shouldUse) {
  const material = materials.find(item => item.id === id);
  if (!material) return;
  material.use = shouldUse;
  showToast(`${material.name} 已${shouldUse ? "保留" : "设为不使用"}`);
  render();
}

function generateStory() {
  const goalInput = document.querySelector("#goalInput");
  state.goal = goalInput ? goalInput.value.trim() : state.goal;
  if (!state.goal) {
    showToast("请先填写视频想表达的内容。");
    return;
  }
  withLoading("正在生成故事线", 4);
}

function choose(key, value) {
  state[key] = value;
  if (key === "platform") state.exportPlatform = value;
  render();
}

function goTo(page) {
  state.page = page;
  state.loadingText = "";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function withLoading(text, nextPage) {
  state.loadingText = text;
  render();
  window.setTimeout(() => {
    state.loadingText = "";
    goTo(nextPage);
  }, 1000);
}

function openCopyModal(index) {
  const item = story[index];
  modalTitle.textContent = `修改${item.title}文案`;
  modalBody.innerHTML = `
    <div class="field">
      <label for="copyInput">推荐文案</label>
      <textarea class="textarea" id="copyInput">${item.copy}</textarea>
    </div>
    <div class="modal-actions">
      <button class="btn secondary" data-modal-action="cancel">取消</button>
      <button class="btn primary" data-modal-action="saveCopy">保存</button>
    </div>
  `;
  openModal();
  modalBody.querySelector("[data-modal-action='saveCopy']").addEventListener("click", () => {
    const value = modalBody.querySelector("#copyInput").value.trim();
    if (!value) {
      showToast("文案不能为空。");
      return;
    }
    item.copy = value;
    closeModal();
    render();
    showToast("文案已更新。");
  });
  bindModalCancel();
}

function openMaterialModal(index) {
  const item = story[index];
  modalTitle.textContent = `替换${item.title}素材`;
  modalBody.innerHTML = `
    <div class="field">
      <label for="materialSelect">选择推荐素材</label>
      <select class="select" id="materialSelect">
        ${materials.filter(material => material.use).map(material => `
          <option ${item.material.includes(material.name) ? "selected" : ""}>${material.name}</option>
        `).join("")}
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn secondary" data-modal-action="cancel">取消</button>
      <button class="btn primary" data-modal-action="saveMaterial">保存</button>
    </div>
  `;
  openModal();
  modalBody.querySelector("[data-modal-action='saveMaterial']").addEventListener("click", () => {
    item.material = modalBody.querySelector("#materialSelect").value;
    closeModal();
    render();
    showToast("素材已替换。");
  });
  bindModalCancel();
}

function bindModalCancel() {
  const cancel = modalBody.querySelector("[data-modal-action='cancel']");
  if (cancel) cancel.addEventListener("click", closeModal);
}

function openModal() {
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) closeModal();
});

render();
