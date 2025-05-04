// 앱 초기화 함수
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCharts();
    loadDemoData();
    initModalHandlers();
    initCalculator();
    initTabHandlers();
});

// 네비게이션 초기화
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 활성 탭 설정
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 섹션 표시
            const sectionId = item.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// 차트 초기화
function initCharts() {
    // 월별 감리 현황 차트
    const monthlyCtx = document.getElementById('monthlyChartCanvas').getContext('2d');
    const monthlyChart = new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [{
                label: '완료된 감리',
                data: [2, 3, 1, 4, 2, 0],
                backgroundColor: 'rgba(26, 115, 232, 0.7)',
                borderColor: 'rgba(26, 115, 232, 1)',
                borderWidth: 1
            }, {
                label: '진행 중인 감리',
                data: [1, 0, 2, 1, 1, 0],
                backgroundColor: 'rgba(251, 188, 5, 0.7)',
                borderColor: 'rgba(251, 188, 5, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    // 카테고리별 이슈 차트
    const issuesCtx = document.getElementById('issuesChartCanvas').getContext('2d');
    const issuesChart = new Chart(issuesCtx, {
        type: 'pie',
        data: {
            labels: ['기능성', '보안', '성능', '사용성', '유지보수성'],
            datasets: [{
                data: [12, 8, 5, 7, 3],
                backgroundColor: [
                    'rgba(26, 115, 232, 0.7)',
                    'rgba(234, 67, 53, 0.7)',
                    'rgba(251, 188, 5, 0.7)',
                    'rgba(52, 168, 83, 0.7)',
                    'rgba(66, 133, 244, 0.7)'
                ],
                borderColor: [
                    'rgba(26, 115, 232, 1)',
                    'rgba(234, 67, 53, 1)',
                    'rgba(251, 188, 5, 1)',
                    'rgba(52, 168, 83, 1)',
                    'rgba(66, 133, 244, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// 데모 데이터 로드
function loadDemoData() {
    // 프로젝트 목록 데이터
    const projectsData = [
        {
            id: 1,
            title: '클라우드 기반 민원 서비스 시스템',
            client: '서울특별시',
            vendor: '테크시스템',
            status: 'in-progress',
            progress: 65,
            startDate: '2025-03-15',
            endDate: '2025-07-30',
            members: ['KS', 'JY', 'HJ']
        },
        {
            id: 2,
            title: '교통정보 통합 시스템',
            client: '국토교통부',
            vendor: '인포테크',
            status: 'completed',
            progress: 100,
            startDate: '2024-11-05',
            endDate: '2025-04-15',
            members: ['MJ', 'JH']
        },
        {
            id: 3,
            title: '공공 클라우드 인프라 구축',
            client: '한국정보화진흥원',
            vendor: '클라우드원',
            status: 'planning',
            progress: 20,
            startDate: '2025-05-10',
            endDate: '2025-11-30',
            members: ['JY', 'SH', 'MH']
        },
        {
            id: 4,
            title: '의료정보 보안 시스템',
            client: '보건복지부',
            vendor: '메디소프트',
            status: 'in-progress',
            progress: 40,
            startDate: '2025-02-20',
            endDate: '2025-08-10',
            members: ['HJ', 'JK', 'YS']
        }
    ];

    // 체크리스트 데이터
    const checklistsData = [
        {
            id: 1,
            title: '시스템 요구사항 분석 체크리스트',
            category: 'planning',
            items: [
                '요구사항 명확성 확인',
                '요구사항 추적성 확인',
                '요구사항 우선순위 설정 확인',
                '비기능 요구사항 포함 여부 확인',
                '이해관계자 요구사항 반영 확인'
            ],
            progress: 60
        },
        {
            id: 2,
            title: '소프트웨어 개발 보안 체크리스트',
            category: 'security',
            items: [
                '입력값 검증 로직 확인',
                '인증 및 인가 구현 확인',
                '민감 정보 암호화 확인',
                'SQL 인젝션 방지 처리 확인',
                '세션 관리 보안성 확인'
            ],
            progress: 40
        },
        {
            id: 3,
            title: '데이터베이스 설계 체크리스트',
            category: 'development',
            items: [
                'ERD 모델링 적정성 확인',
                '인덱스 설계 적정성 확인',
                '정규화 수준 확인',
                '트랜잭션 처리 확인',
                '데이터 무결성 제약조건 확인'
            ],
            progress: 80
        },
        {
            id: 4,
            title: '성능 테스트 체크리스트',
            category: 'performance',
            items: [
                '동시 사용자 처리 성능 확인',
                '대용량 데이터 처리 성능 확인',
                '응답 시간 확인',
                '자원 사용률 확인',
                '확장성 확인'
            ],
            progress: 20
        }
    ];

    // 보고서 데이터
    const reportsData = [
        {
            id: 1,
            title: '분석단계 감리 보고서',
            project: '클라우드 기반 민원 서비스 시스템',
            date: '2025-04-15',
            type: 'analysis'
        },
        {
            id: 2,
            title: '설계단계 감리 보고서',
            project: '교통정보 통합 시스템',
            date: '2025-03-05',
            type: 'design'
        },
        {
            id: 3,
            title: '종료 감리 보고서',
            project: '의료정보 보안 시스템',
            date: '2025-04-28',
            type: 'final'
        }
    ];

    // 가이드 데이터
    const guidesData = {
        procedures: [
            {
                title: '감리 절차 개요',
                content: '정보시스템 감리는 감리 계획, 착수, 수행, 보고의 4단계로 이루어집니다. 각 단계는 체계적인 절차에 따라 진행되어야 하며, 감리 결과의 객관성과 정확성을 보장해야 합니다.'
            },
            {
                title: '감리 계획 단계',
                content: '감리 계획 단계에서는 감리 대상 시스템에 대한 이해, 감리 범위 및 일정 설정, 감리원 구성, 감리 항목 선정 등의 활동을 수행합니다.'
            }
        ],
        bestPractices: [
            {
                title: '효과적인 감리를 위한 팁',
                content: '효과적인 감리를 위해서는 사전에 충분한 자료 수집 및 분석이 필요하며, 개발 단계별 감리 항목과 체크리스트를 체계적으로 준비해야 합니다.'
            }
        ],
        caseStudies: [
            {
                title: '공공기관 클라우드 전환 사례',
                content: 'A기관의 클라우드 전환 프로젝트에서는 데이터 마이그레이션 단계의 위험 요소를 감리를 통해 사전에 식별하여 성공적인 전환을 이루었습니다.'
            }
        ],
        templates: [
            {
                title: '감리 계획서 템플릿',
                content: '감리 계획서는 감리 개요, 감리 목적, 감리 대상, 감리 범위, 감리 일정, 감리원 편성, 감리 방법 등을 포함해야 합니다.'
            }
        ]
    };

    // 법령 및 기준 데이터
    const regulationsData = {
        laws: [
            {
                title: '전자정부법',
                content: '전자정부법 제64조에 따르면, 행정기관등의 장은 정보시스템의 특성 및 사업 규모 등이 대통령령으로 정하는 기준에 해당하는 정보시스템에 대하여 제3자의 감리를 받아야 합니다.'
            }
        ],
        standards: [
            {
                title: '정보시스템 감리기준',
                content: '행정안전부 고시로 정해진 정보시스템 감리기준은 감리 대상, 감리 시기, 감리 절차, 감리 영역, 감리 준비, 감리 수행, 감리 보고 등에 관한 기준을 제시합니다.'
            }
        ],
        guidelines: [
            {
                title: '분야별 감리 가이드라인',
                content: '행정안전부와 한국지능정보사회진흥원은 소프트웨어 개발, 정보보안, 데이터베이스 등 분야별 감리 가이드라인을 제공하여 감리의 일관성과 품질을 향상시키고 있습니다.'
            }
        ],
        notices: [
            {
                title: '행정안전부 고시',
                content: '행정안전부 고시 제2023-XX호 정보시스템 감리기준은 정보시스템 감리의 기준, 절차, 방법 등을 규정하는 중요한 근거 자료입니다.'
            }
        ]
    };

    // 프로젝트 목록 렌더링
    renderProjects(projectsData);
    
    // 체크리스트 목록 렌더링
    renderChecklists(checklistsData);
    
    // 보고서 목록 렌더링
    renderReports(reportsData);
    
    // 가이드 콘텐츠 렌더링
    renderGuides(guidesData, 'procedures');
    
    // 법령 및 기준 콘텐츠 렌더링
    renderRegulations(regulationsData, 'laws');
}

// 프로젝트 목록 렌더링 함수
function renderProjects(projects) {
    const projectsList = document.querySelector('.projects-list');
    
    if (!projectsList) return;
    
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const statusText = {
            'planning': '계획 중',
            'in-progress': '진행 중',
            'completed': '완료됨'
        };
        
        const statusClass = {
            'planning': 'status-planning',
            'in-progress': 'status-in-progress',
            'completed': 'status-completed'
        };
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <span class="project-status ${statusClass[project.status]}">${statusText[project.status]}</span>
            <h3 class="project-title">${project.title}</h3>
            <div class="project-details">
                <p>발주기관: ${project.client}</p>
                <p>사업자: ${project.vendor}</p>
            </div>
            <div class="project-progress">
                <div class="progress-label">
                    <span>진행률</span>
                    <span>${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-value" style="width: ${project.progress}%"></div>
                </div>
            </div>
            <div class="project-footer">
                <div class="project-date">
                    ${formatDate(project.startDate)} ~ ${formatDate(project.endDate)}
                </div>
                <div class="project-members">
                    ${project.members.map(member => `
                        <div class="member-avatar">${member}</div>
                    `).join('')}
                </div>
            </div>
        `;
        
        projectsList.appendChild(projectCard);
    });
}

// 체크리스트 목록 렌더링 함수
function renderChecklists(checklists) {
    const checklistsContainer = document.querySelector('.checklists-container');
    
    if (!checklistsContainer) return;
    
    checklistsContainer.innerHTML = '';
    
    checklists.forEach(checklist => {
        const categoryText = {
            'planning': '기획/분석',
            'development': '개발',
            'security': '보안',
            'performance': '성능',
            'operation': '운영'
        };
        
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item';
        checklistItem.setAttribute('data-category', checklist.category);
        checklistItem.innerHTML = `
            <div class="checklist-header">
                <div>
                    <h3 class="checklist-title">${checklist.title}</h3>
                    <span class="checklist-category">${categoryText[checklist.category]}</span>
                </div>
                <div class="checklist-actions">
                    <button><i class="fas fa-edit"></i></button>
                    <button><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            <div class="checklist-info">
                ${checklist.items.length}개 항목
            </div>
            <div class="checklist-progress">
                <div class="progress-label">
                    <span>진행률</span>
                    <span>${checklist.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-value" style="width: ${checklist.progress}%"></div>
                </div>
            </div>
            <ul class="checklist-items">
                ${checklist.items.slice(0, 3).map(item => `
                    <li class="check-item">
                        <input type="checkbox" id="check-${checklist.id}-${checklist.items.indexOf(item)}">
                        <label class="check-item-text" for="check-${checklist.id}-${checklist.items.indexOf(item)}">${item}</label>
                    </li>
                `).join('')}
                ${checklist.items.length > 3 ? `<li class="check-item">+ ${checklist.items.length - 3}개 더 보기</li>` : ''}
            </ul>
        `;
        
        checklistsContainer.appendChild(checklistItem);
    });
    
    // 체크리스트 카테고리 필터링 이벤트 처리
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // 버튼 활성화 상태 변경
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 체크리스트 필터링
            const checklistItems = document.querySelectorAll('.checklist-item');
            checklistItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// 보고서 목록 렌더링 함수
function renderReports(reports) {
    const reportsContainer = document.querySelector('.reports-container');
    
    if (!reportsContainer) return;
    
    reportsContainer.innerHTML = '';
    
    reports.forEach(report => {
        const reportIcon = {
            'analysis': 'fas fa-search',
            'design': 'fas fa-pencil-ruler',
            'final': 'fas fa-check-circle'
        };
        
        const reportCard = document.createElement('div');
        reportCard.className = 'report-card';
        reportCard.innerHTML = `
            <div class="report-icon">
                <i class="${reportIcon[report.type] || 'fas fa-file-alt'}"></i>
            </div>
            <h3 class="report-title">${report.title}</h3>
            <div class="report-info">
                <p>프로젝트: ${report.project}</p>
                <p>보고서 일자: ${formatDate(report.date)}</p>
            </div>
            <div class="report-footer">
                <div class="report-date">
                    생성일: ${formatDate(report.date)}
                </div>
                <div class="report-actions">
                    <button title="열기"><i class="fas fa-eye"></i></button>
                    <button title="다운로드"><i class="fas fa-download"></i></button>
                    <button title="공유"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
        `;
        
        reportsContainer.appendChild(reportCard);
    });
}

// 가이드 콘텐츠 렌더링 함수
function renderGuides(guides, activeTab) {
    const guidesContent = document.querySelector('.guides-content');
    
    if (!guidesContent) return;
    
    const content = guides[activeTab] || [];
    
    guidesContent.innerHTML = '';
    
    content.forEach(item => {
        const guideArticle = document.createElement('article');
        guideArticle.className = 'guide-article';
        guideArticle.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        
        guidesContent.appendChild(guideArticle);
    });
}

// 법령 및 기준 콘텐츠 렌더링 함수
function renderRegulations(regulations, activeTab) {
    const regulationsContent = document.querySelector('.regulations-content');
    
    if (!regulationsContent) return;
    
    const content = regulations[activeTab] || [];
    
    regulationsContent.innerHTML = '';
    
    content.forEach(item => {
        const regulationArticle = document.createElement('article');
        regulationArticle.className = 'regulation-article';
        regulationArticle.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        
        regulationsContent.appendChild(regulationArticle);
    });
}

// 모달 핸들러 초기화
function initModalHandlers() {
    // 프로젝트 모달
    const projectModal = document.getElementById('projectModal');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    if (!projectModal || !addProjectBtn) return;
    
    // 모달 열기
    addProjectBtn.addEventListener('click', () => {
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    });
    
    // 모달 닫기 (X 버튼)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // 모달 닫기 (취소 버튼)
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // 프로젝트 폼 제출 처리
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // 폼 데이터 수집
            const formData = {
                title: document.getElementById('projectName').value,
                client: document.getElementById('projectClient').value,
                vendor: document.getElementById('projectVendor').value,
                budget: document.getElementById('projectBudget').value,
                startDate: document.getElementById('projectStart').value,
                endDate: document.getElementById('projectEnd').value,
                description: document.getElementById('projectDescription').value
            };
            
            // 여기에 프로젝트 저장 로직 추가
            console.log('새 프로젝트 데이터:', formData);
            
            // 성공 메시지 출력 (실제 구현에서는 서버 응답 후 처리)
            alert('프로젝트가 성공적으로 추가되었습니다.');
            
            // 모달 닫기
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // 폼 초기화
            projectForm.reset();
        });
    }
}

// 감리비 계산기 초기화
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (!calculateBtn) return;
    
    calculateBtn.addEventListener('click', () => {
        // 입력값 가져오기
        const projectType = document.getElementById('projectType').value;
        const projectScale = parseFloat(document.getElementById('projectScale').value) || 0;
        const auditComplexity = document.getElementById('auditComplexity').value;
        const auditPeriod = parseInt(document.getElementById('auditPeriod').value) || 0;
        const auditorCount = parseInt(document.getElementById('auditorCount').value) || 0;
        
        // 간단한 감리비 계산 로직 (실제 구현에서는 더 복잡한 로직 필요)
        let baseFee = 0;
        
        // 사업 유형별 기본 요율 설정
        const rateByType = {
            'sw-dev': 0.022,
            'db-construction': 0.018,
            'hw-implementation': 0.015
        };
        
        // 난이도 조정 계수
        const complexityFactor = {
            'low': 0.9,
            'medium': 1.0,
            'high': 1.2
        };
        
        // 기본 감리비 계산
        baseFee = projectScale * (rateByType[projectType] || 0.02);
        
        // 난이도 조정
        baseFee *= complexityFactor[auditComplexity] || 1.0;
        
        // 감리원 인건비 계산 (가정: 일 평균 80만원)
        const laborCost = auditorCount * auditPeriod * 800000;
        
        // 총 감리비
        const totalFee = baseFee * 10000 + laborCost;
        
        // 결과 표시
        const resultDiv = document.getElementById('calculationResult');
        
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="result-section">
                    <h4>사업 정보</h4>
                    <table class="result-table">
                        <tr>
                            <th>사업 유형</th>
                            <td>${projectType === 'sw-dev' ? '소프트웨어 개발' : 
                                  projectType === 'db-construction' ? '데이터베이스 구축' : 
                                  '하드웨어 도입'}</td>
                        </tr>
                        <tr>
                            <th>사업 규모</th>
                            <td>${projectScale.toLocaleString()}백만원</td>
                        </tr>
                        <tr>
                            <th>감리 난이도</th>
                            <td>${auditComplexity === 'low' ? '낮음' : 
                                  auditComplexity === 'medium' ? '중간' : '높음'}</td>
                        </tr>
                    </table>
                </div>
                
                <div class="result-section">
                    <h4>감리비 산출 결과</h4>
                    <table class="result-table">
                        <tr>
                            <th>기본 감리비</th>
                            <td>${Math.round(baseFee * 10000).toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <th>감리원 인건비</th>
                            <td>${laborCost.toLocaleString()}원</td>
                        </tr>
                        <tr>
                            <th>총 감리비</th>
                            <td><strong>${Math.round(totalFee).toLocaleString()}원</strong></td>
                        </tr>
                    </table>
                </div>
                
                <p class="result-note">* 해당 계산 결과는 예상치이며, 실제 감리비는 관련 법령 및 기준에 따라 달라질 수 있습니다.</p>
            `;
        }
    });
}

// 탭 핸들러 초기화
function initTabHandlers() {
    // 가이드 탭
    const guideTabs = document.querySelectorAll('.guide-tab');
    guideTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 탭 활성화
            guideTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 콘텐츠 렌더링
            const tabName = tab.getAttribute('data-tab');
            renderGuides({
                procedures: [
                    {
                        title: '감리 절차 개요',
                        content: '정보시스템 감리는 감리 계획, 착수, 수행, 보고의 4단계로 이루어집니다. 각 단계는 체계적인 절차에 따라 진행되어야 하며, 감리 결과의 객관성과 정확성을 보장해야 합니다.'
                    },
                    {
                        title: '감리 계획 단계',
                        content: '감리 계획 단계에서는 감리 대상 시스템에 대한 이해, 감리 범위 및 일정 설정, 감리원 구성, 감리 항목 선정 등의 활동을 수행합니다.'
                    }
                ],
                bestPractices: [
                    {
                        title: '효과적인 감리를 위한 팁',
                        content: '효과적인 감리를 위해서는 사전에 충분한 자료 수집 및 분석이 필요하며, 개발 단계별 감리 항목과 체크리스트를 체계적으로 준비해야 합니다.'
                    }
                ],
                caseStudies: [
                    {
                        title: '공공기관 클라우드 전환 사례',
                        content: 'A기관의 클라우드 전환 프로젝트에서는 데이터 마이그레이션 단계의 위험 요소를 감리를 통해 사전에 식별하여 성공적인 전환을 이루었습니다.'
                    }
                ],
                templates: [
                    {
                        title: '감리 계획서 템플릿',
                        content: '감리 계획서는 감리 개요, 감리 목적, 감리 대상, 감리 범위, 감리 일정, 감리원 편성, 감리 방법 등을 포함해야 합니다.'
                    }
                ]
            }, tabName);
        });
    });
    
    // 법령 및 기준 탭
    const regulationTabs = document.querySelectorAll('.regulation-tab');
    regulationTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 탭 활성화
            regulationTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 콘텐츠 렌더링
            const tabName = tab.getAttribute('data-tab');
            renderRegulations({
                laws: [
                    {
                        title: '전자정부법',
                        content: '전자정부법 제64조에 따르면, 행정기관등의 장은 정보시스템의 특성 및 사업 규모 등이 대통령령으로 정하는 기준에 해당하는 정보시스템에 대하여 제3자의 감리를 받아야 합니다.'
                    }
                ],
                standards: [
                    {
                        title: '정보시스템 감리기준',
                        content: '행정안전부 고시로 정해진 정보시스템 감리기준은 감리 대상, 감리 시기, 감리 절차, 감리 영역, 감리 준비, 감리 수행, 감리 보고 등에 관한 기준을 제시합니다.'
                    }
                ],
                guidelines: [
                    {
                        title: '분야별 감리 가이드라인',
                        content: '행정안전부와 한국지능정보사회진흥원은 소프트웨어 개발, 정보보안, 데이터베이스 등 분야별 감리 가이드라인을 제공하여 감리의 일관성과 품질을 향상시키고 있습니다.'
                    }
                ],
                notices: [
                    {
                        title: '행정안전부 고시',
                        content: '행정안전부 고시 제2023-XX호 정보시스템 감리기준은 정보시스템 감리의 기준, 절차, 방법 등을 규정하는 중요한 근거 자료입니다.'
                    }
                ]
            }, tabName);
        });
    });
}

// 날짜 형식 변환 함수
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}