const progress = document.querySelector('#reading-progress');
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const workIntro = document.querySelector('#work');
const ancientProject = document.querySelector('#ancient');
if (workIntro && ancientProject) workIntro.insertAdjacentElement('afterend', ancientProject);

const livisGallery = document.querySelector('.project-gallery--livis');
const livisSlides = livisGallery ? [...livisGallery.querySelectorAll('.gallery-panel')] : [];
const livisCounter = document.querySelector('.livis-gallery-controls span');
function livisSlideIndex() {
  return livisGallery ? Math.max(0, Math.min(livisSlides.length - 1, Math.round(livisGallery.scrollLeft / livisGallery.clientWidth))) : 0;
}
function updateLivisCounter() {
  if (livisCounter) livisCounter.textContent = `${String(livisSlideIndex() + 1).padStart(2, '0')} / ${String(livisSlides.length).padStart(2, '0')}`;
}
livisGallery?.addEventListener('scroll', updateLivisCounter, { passive: true });
document.querySelectorAll('[data-livis-slide]').forEach((button) => button.addEventListener('click', () => {
  const direction = button.dataset.livisSlide === 'next' ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(livisSlides.length - 1, livisSlideIndex() + direction));
  livisSlides[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}));

const lionGallery = document.querySelector('.project-gallery--lion');
const lionSlides = lionGallery ? [...lionGallery.querySelectorAll('.gallery-panel')] : [];
const lionCounter = document.querySelector('.lion-gallery-controls span');
function lionSlideIndex() {
  return lionGallery ? Math.max(0, Math.min(lionSlides.length - 1, Math.round(lionGallery.scrollLeft / lionGallery.clientWidth))) : 0;
}
function updateLionCounter() {
  if (lionCounter) lionCounter.textContent = `${String(lionSlideIndex() + 1).padStart(2, '0')} / ${String(lionSlides.length).padStart(2, '0')}`;
}
lionGallery?.addEventListener('scroll', updateLionCounter, { passive: true });
document.querySelectorAll('[data-lion-slide]').forEach((button) => button.addEventListener('click', () => {
  const direction = button.dataset.lionSlide === 'next' ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(lionSlides.length - 1, lionSlideIndex() + direction));
  lionSlides[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}));

const jikeGallery = document.querySelector('.project-gallery--jike');
const jikeSlides = jikeGallery ? [...jikeGallery.querySelectorAll('.gallery-panel')] : [];
const jikeCounter = document.querySelector('.jike-gallery-controls span');
function jikeSlideIndex() {
  return jikeGallery ? Math.max(0, Math.min(jikeSlides.length - 1, Math.round(jikeGallery.scrollLeft / jikeGallery.clientWidth))) : 0;
}
function updateJikeCounter() {
  if (jikeCounter) jikeCounter.textContent = `${String(jikeSlideIndex() + 1).padStart(2, '0')} / ${String(jikeSlides.length).padStart(2, '0')}`;
}
jikeGallery?.addEventListener('scroll', updateJikeCounter, { passive: true });
document.querySelectorAll('[data-jike-slide]').forEach((button) => button.addEventListener('click', () => {
  const direction = button.dataset.jikeSlide === 'next' ? 1 : -1;
  const nextIndex = Math.max(0, Math.min(jikeSlides.length - 1, jikeSlideIndex() + direction));
  jikeSlides[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}));

function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = available > 0 ? window.scrollY / available : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, fraction * 100))}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
window.addEventListener('resize', () => {
  if (openedStep && timelinePreview && !timelinePreview.hidden) positionTimelinePreview(openedStep);
});
updateProgress();

const timelineSteps = [...document.querySelectorAll('.timeline-step')];
const projectSections = [...document.querySelectorAll('#experience, article.project[id]')];
const timelinePreview = document.querySelector('#timeline-preview');
const previewTitle = document.querySelector('#preview-title');
const previewDescription = document.querySelector('#preview-description');
const previewLink = document.querySelector('#preview-link');
const previewLabel = document.querySelector('.preview-label');
const previewImage = document.querySelector('#preview-image');
const previewClose = document.querySelector('.preview-close');
const timelineList = document.querySelector('.timeline-list');
let openedStep = null;

const projectPreviews = {
  enrollment: { title: '入读广东工业大学', description: '2025 年 9 月入读工商管理专业本科，预计于 2029 年毕业。' },
  ancient: { title: '古建智寻', description: '负责画卷式入口与星云手部交互等体验构思、文案编写与网页审美设计；技术成员完成页面开发，功能上线状态仍待逐项核对。' },
  lion: { title: '醒目龙狮', description: '独立完成市场分析、品牌定位、IP 设定、整合营销与财务预测方案。' },
  jike: { title: '迹客行', description: '负责文旅商业计划书中的市场、产品、运营与财务内容编写。' },
  yingge: { title: '英歌文化', description: '负责英歌文化网站的栏目结构、内容路径与互动入口构思，并参与英歌舞 IP 相关的营销宣传。' },
  'ancient-rag': { title: '古建智寻 · AI 文旅 RAG 导览问答平台', description: 'AI 文旅 RAG 导览问答平台；详细项目职责与成果待补充。' },
  experience: { title: '珠海衫木少儿成长中心', description: '2026 年暑期担任助教，参与小红书账号内容推广与朋友圈营销，维护 5 个家长社群，整理课程内容和家长需求反馈。' },
  livis: { title: 'Livis 理想眼镜', description: '独立完成面向美国市场的中英双语产品说明书、图表配置与资料核对。' },
};
const projectPreviewImages = {
  ancient: 'gujian-home.png',
  'ancient-rag': 'gujian-star-cloud.png',
  lion: 'lion-cover.png',
  jike: 'jike-attractions.png',
  yingge: 'yingge-home.png',
  livis: 'livis-cover.png',
};

function markTimelineStep(id) {
  for (const step of timelineSteps) {
    const active = step.dataset.project === id;
    step.classList.toggle('is-active', active);
    if (active) step.setAttribute('aria-current', 'location');
    else step.removeAttribute('aria-current');
  }
}

function positionTimelinePreview(step) {
  if (!timelinePreview || !timelineList || window.matchMedia('(max-width: 700px)').matches) return;
  const preferred = step.offsetLeft + step.offsetWidth / 2 - timelinePreview.offsetWidth / 2;
  const maximum = Math.max(0, timelineList.clientWidth - timelinePreview.offsetWidth);
  timelinePreview.style.left = `${Math.max(0, Math.min(preferred, maximum))}px`;
}

for (const step of timelineSteps) {
  step.addEventListener('click', () => {
    const id = step.dataset.project;
    const project = projectPreviews[id];
    if (!project || !timelinePreview) return;
    previewTitle.textContent = project.title;
    previewDescription.textContent = project.description;
    if (previewImage && projectPreviewImages[id]) {
      previewImage.src = `assets/${projectPreviewImages[id]}`;
      previewImage.alt = `${project.title}项目预览图`;
    }
    const isExperience = id === 'experience';
    const isEnrollment = id === 'enrollment';
    const isRag = id === 'ancient-rag';
    const isTimelineInfo = isExperience || isEnrollment;
    previewLink.href = isEnrollment ? '#about' : isRag ? '#ancient' : `#${id}`;
    timelinePreview.classList.toggle('is-experience', isTimelineInfo);
    previewLabel.textContent = isEnrollment ? 'EDUCATION PREVIEW / 入学信息' : isExperience ? 'INTERNSHIP PREVIEW / 实习经历' : 'PROJECT PREVIEW / 项目预览';
    previewLink.innerHTML = `${isEnrollment ? '查看个人简介' : isExperience ? '查看完整实习经历' : isRag ? '查看相关项目' : '查看完整项目'} <span aria-hidden="true">↗</span>`;
    timelinePreview.hidden = false;
    positionTimelinePreview(step);
    timelineSteps.forEach((item) => item.setAttribute('aria-expanded', String(item === step)));
    openedStep = step;
    markTimelineStep(id);
    timelineList?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function closePreview() {
  if (!timelinePreview || timelinePreview.hidden) return;
  timelinePreview.hidden = true;
  timelineSteps.forEach((step) => step.setAttribute('aria-expanded', 'false'));
  openedStep?.focus();
}

previewClose?.addEventListener('click', closePreview);
previewLink?.addEventListener('click', () => {
  if (timelinePreview) timelinePreview.hidden = true;
  timelineSteps.forEach((step) => step.setAttribute('aria-expanded', 'false'));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePreview();
});

if ('IntersectionObserver' in window) {
  const projectObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) markTimelineStep(visible.target.id);
  }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, 0.25, 0.5] });
  projectSections.forEach((section) => projectObserver.observe(section));
}

if (location.hash) markTimelineStep(location.hash.slice(1));
