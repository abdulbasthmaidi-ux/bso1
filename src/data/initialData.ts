import { Project, Supervisor } from '../types';

export const FACULTY_MEMBERS: Supervisor[] = [
  {
    id: 'sup-1',
    name: 'أ.د. ريم بنت عبدالعزيز الخالدي',
    title: 'أستاذ دكتور في الذكاء الاصطناعي وتعلم الآلة',
    email: 'r.khalidi@university.edu.sa',
    department: 'قسم الذكاء الاصطناعي وعلم البيانات',
    avatar: '/src/assets/images/avatar_supervisor_dr_1790356331070.jpg',
  },
  {
    id: 'sup-2',
    name: 'د. حسام بن طارق الشريف',
    title: 'أستاذ مشارك - رئيس لجنة مشاريع التخرج',
    email: 'h.alsharif@university.edu.sa',
    department: 'قسم هندسة البرمجيات وتكنولوجيا المعلومات',
    avatar: '',
  },
  {
    id: 'sup-3',
    name: 'د. فيصل بن عبدالله المهيدب',
    title: 'أستاذ مساعد في الأمن السيبراني والشبكات',
    email: 'f.muhaidib@university.edu.sa',
    department: 'قسم الأمن السيبراني والتحري الجنائي الرقمي',
    avatar: '',
  },
  {
    id: 'sup-4',
    name: 'د. سارة بنت منصور العتيبي',
    title: 'أستاذ مشارك في نظم المعلومات والحوسبة السحابية',
    email: 's.otaibi@university.edu.sa',
    department: 'قسم نظم المعلومات',
    avatar: '',
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-101',
    code: 'CS-GP2-2026-01',
    title: 'نظام الكشف المبكر والآلي عن آفات المحاصيل الزراعية بالرؤية الحاسوبية وإنترنت الأشياء (AgriVision AI)',
    titleEn: 'AgriVision AI: Early Autonomous Crop Pest Detection using Computer Vision & Edge IoT',
    department: 'قسم الذكاء الاصطناعي وعلم البيانات',
    academicYear: '2026 / 2027',
    term: 'الفصل الدراسي الثاني (مشروع تخرج 2)',
    category: 'graduation_2',
    abstract: 'يهدف المشروع إلى معالجة خسائر الإنتاج الزراعي من خلال تطوير منظومة متكاملة تجمع بين كاميرات المراقبة الحقلية ونماذج الرؤية الحاسوبية العميقة المعالجة طرفياً (Edge Computing)، مع لوحة تحكم سحابية ترسل تنبيهات استباقية للمزارعين وتوصيات بالعلاج الموجه.',
    objectives: [
      'تدريب نموذج Vision Transformer مخصص لتصنيف 14 نوعاً من آفات النخيل وأشجار الفاكهة بدقة تفوق 96%.',
      'بناء عقد استشعار طرفية منخفضة الطاقة متصلة بشبكات LoRaWAN لرصد درجة الحرارة ورطوبة التربة والغطاء النباتي.',
      'تطوير تطبيق ويب وتطبيق هاتف لإشعار المزارعين لحظياً بالبؤر المصابة مع خرائط حرارية دقيقة للمزرعة.',
      'تقليل استهلاك المبيدات الحشرية بنسبة 35% عبر الرش الانتقائي المستهدف.'
    ],
    methodology: 'اعتمد الفريق منهجية Agile Scrum مع تقسيم المشروع إلى 5 سباقات رئيسية، بدءاً من جمع بيانات الصور الحقلية وتجهيز مجموعة بيانات محلية، ثم تدريب النماذج وتقييمها على أجهزة Jetson Nano، ثم تكامل النظام مع الواجهة الخلفية.',
    status: 'ready_for_defense',
    progressPercentage: 92,
    createdAt: '2026-09-10',
    lastActivity: 'منذ ساعتين',
    supervisor: FACULTY_MEMBERS[0],
    coSupervisor: FACULTY_MEMBERS[1],
    students: [
      {
        id: 'std-01',
        name: 'عبدالله بن محمد السعيد',
        studentId: '441008921',
        email: 'a.alsaeed@student.edu.sa',
        role: 'قائد الفريق ومطور نماذج الرؤية الحاسوبية',
        avatar: '/src/assets/images/avatar_student_lead_1790356341351.jpg',
        gpa: '4.88 / 5.00'
      },
      {
        id: 'std-02',
        name: 'يزيد بن خالد الدوسري',
        studentId: '441009142',
        email: 'y.aldossary@student.edu.sa',
        role: 'مهندس إنترنت الأشياء والبرمجيات المدمجة',
        gpa: '4.75 / 5.00'
      },
      {
        id: 'std-03',
        name: 'ريان بن صالح القحطاني',
        studentId: '441007883',
        email: 'r.alqahtani@student.edu.sa',
        role: 'مطور واجهات المستخدم واللوحة السحابية',
        gpa: '4.82 / 5.00'
      }
    ],
    milestones: [
      {
        id: 'ms-1',
        title: 'اعتماد مقترح المشروع والدراسات المرجعية',
        description: 'صياغة وثيقة المقترح الأكاديمي، مراجعة الأبحاث السابقة، وتحديد المتطلبات التقنية.',
        dueDate: '2026-10-15',
        weightPercentage: 15,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-2',
        title: 'تصميم البنية الهندسية وتجميع البيانات الحقلية',
        description: 'مخططات المعمارية ومجموعة البيانات الموسومة (Annotated Dataset) لأمراض النخيل.',
        dueDate: '2026-11-20',
        weightPercentage: 20,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-3',
        title: 'تطوير النواة البرمجية وتدريب نماذج الرؤية',
        description: 'تدريب النماذج، تحسين دقة الاستنتاج، وربط أجهزة إنترنت الأشياء عبر بروتوكول MQTT.',
        dueDate: '2026-12-25',
        weightPercentage: 25,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-4',
        title: 'الاختبارات الميدانية ومسودة التقرير النهائي',
        description: 'تجربة المنظومة في مزرعة إرشادية، قياس زمن الاستجابة، وتسليم النسخة الأولية من رسالة المشروع.',
        dueDate: '2027-01-28',
        weightPercentage: 20,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-5',
        title: 'المناقشة العلنية والعرض التقديمي النهائي',
        description: 'عرض النموذج الأولي الفعلي أمام لجنة المناقشة الأكاديمية وتقديم العرض التفاعلي.',
        dueDate: '2027-02-18',
        weightPercentage: 20,
        status: 'in_progress',
        deliverableRequired: true
      }
    ],
    deliverables: [
      {
        id: 'del-01',
        milestoneId: 'ms-1',
        title: 'وثيقة مقترح المشروع المعتمدة (Proposal Doc v1.2)',
        submittedBy: 'عبدالله بن محمد السعيد',
        submittedAt: '2026-10-14',
        version: '1.2',
        fileName: 'AgriVision_Final_Proposal_v1.2.pdf',
        fileSize: '4.8 MB',
        plagiarismSimilarity: 4.2,
        status: 'approved',
        grade: 98,
        feedback: [
          {
            id: 'fb-1',
            authorName: 'أ.د. ريم الخالدي',
            authorRole: 'supervisor',
            text: 'مقترح ممتاز ومستوفٍ لكافة المعايير المنهجية. تم التأكد من أصالة المشكلة وجدوى الأجهزة المقترحة.',
            date: '2026-10-15'
          }
        ]
      },
      {
        id: 'del-02',
        milestoneId: 'ms-2',
        title: 'تقرير التصميم المعماري ووصف مصفوفة البيانات',
        submittedBy: 'يزيد بن خالد الدوسري',
        submittedAt: '2026-11-19',
        version: '1.0',
        fileName: 'AgriVision_Architecture_Dataset_Doc.pdf',
        fileSize: '12.4 MB',
        plagiarismSimilarity: 5.8,
        status: 'approved',
        grade: 95,
        feedback: [
          {
            id: 'fb-2',
            authorName: 'أ.د. ريم الخالدي',
            authorRole: 'supervisor',
            text: 'مخططات UML والرسوم البيانية الهندسية واضحة للغاية. تم اعتماد الهيكلية.',
            date: '2026-11-20'
          }
        ]
      },
      {
        id: 'del-03',
        milestoneId: 'ms-4',
        title: 'المسودة النهائية لتقرير مشروع التخرج (Final Draft Report)',
        submittedBy: 'عبدالله بن محمد السعيد',
        submittedAt: '2027-01-26',
        version: '2.0',
        fileName: 'AgriVision_Graduation_Thesis_Draft_v2.pdf',
        fileSize: '18.7 MB',
        plagiarismSimilarity: 6.1,
        status: 'approved',
        grade: 96,
        feedback: [
          {
            id: 'fb-3',
            authorName: 'د. حسام الشريف',
            authorRole: 'committee',
            text: 'تقرير متكامل ومنسق بحسب دليل الكلية لكتابة الرسائل الأكاديمية. تمت الموافقة على نقله لجلسة المناقشة.',
            date: '2027-01-29'
          }
        ]
      }
    ],
    tasks: [
      {
        id: 'tsk-01',
        title: 'إعداد منصة العرض الحي (Live Demo Environment)',
        description: 'تجهيز الكاميرا الحقلية ومتحكم Jetson للتجربة المباشرة في قاعة المناقشة.',
        assignedTo: 'يزيد بن خالد الدوسري',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-15'
      },
      {
        id: 'tsk-02',
        title: 'تصميم الشرائح التقديمية وتدريب الفريق على الإلقاء',
        description: 'إعداد 25 شريحة مكثفة توضح المشكلة والحل والنتائج التجريبية والمقارنات العلمية.',
        assignedTo: 'عبدالله بن محمد السعيد',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-14'
      },
      {
        id: 'tsk-03',
        title: 'طباعة وتجليد النسخ الرسمية الأربع للجنة التحكيم',
        description: 'طباعة فاخرة بحسب مواصفات عمادة الدراسات العليا وتسليمها للسكرتارية الأكاديمية.',
        assignedTo: 'ريان بن صالح القحطاني',
        status: 'todo',
        priority: 'medium',
        dueDate: '2027-02-16'
      },
      {
        id: 'tsk-04',
        title: 'تحسين كود الاستدلال وتقليل زمن المعالجة إلى 140ms',
        description: 'تطبيق TensorRT quantization على نموذج Vision Transformer.',
        assignedTo: 'عبدالله بن محمد السعيد',
        status: 'done',
        priority: 'high',
        dueDate: '2027-01-20'
      }
    ],
    supervisoryMeetings: [
      {
        id: 'meet-1',
        date: '2026-10-02',
        time: '10:30 ص',
        location: 'مكتب المشرف - مبنى 31 قاعة 204',
        agenda: 'مناقشة خطة البحث واختيار تقنيات الحوسبة الطرفية',
        outcomes: 'تم الاتفاق على استخدام Jetson Nano بدلاً من Raspberry Pi 4 نظراً لمتطلبات تسريع الذكاء الاصطناعي.',
        actionItems: ['تجهيز بيئة المحاكاة', 'شراء الحساسات عبر ميزانية مشاريع التخرج'],
        nextMeetingDate: '2026-10-23',
        supervisorSignature: true,
        attendedStudents: ['عبدالله بن محمد السعيد', 'يزيد بن خالد الدوسري', 'ريان بن صالح القحطاني']
      },
      {
        id: 'meet-2',
        date: '2026-11-15',
        time: '11:00 ص',
        location: 'معمل أبحاث الذكاء الاصطناعي - القاعة الذكية',
        agenda: 'مراجعة دقة التصنيف ومخطط استهلاك الطاقة لبطاريات الحقول',
        outcomes: 'أظهر النموذج دقة 94.2% في البيئة التجريبية، وتم التوصية بزيادة عينات الإضاءة الليلية.',
        actionItems: ['إضافة 500 صورة بالليل بواسطة إضاءة تحت الحمراء', 'تحسين خوارزمية السكون المؤقت للعقد الحقلية'],
        nextMeetingDate: '2026-12-10',
        supervisorSignature: true,
        attendedStudents: ['عبدالله بن محمد السعيد', 'يزيد بن خالد الدوسري']
      },
      {
        id: 'meet-3',
        date: '2027-01-18',
        time: '01:00 م',
        location: 'قاعة الاجتماعات الافتراضية عبر الشبكة الأكاديمية',
        agenda: 'المراجعة النهائية لتقرير التخرج والاطلاع على نتائج فحص التشابه العلمي',
        outcomes: 'نسبة الاستلال العلمي 6.1% وهي ضمن الحد المسموح (أقل من 15%). تم التوقيع بالموافقة على خوض المناقشة النهائية.',
        actionItems: ['إضافة فقرة شكر لمركز الأبحاث الزراعية', 'تجهيز ملصق المشروع البحثي (Poster)'],
        nextMeetingDate: '2027-02-12',
        supervisorSignature: true,
        attendedStudents: ['عبدالله بن محمد السعيد', 'يزيد بن خالد الدوسري', 'ريان بن صالح القحطاني']
      }
    ],
    defenseSchedule: {
      date: '2027-02-18',
      time: '10:00 صباحاً',
      hall: 'المدرج الرئيسي لكلية علوم الحاسب والمعلومات (قاعة ابن الهيثم)',
      headOfCommittee: 'أ.د. ريم بنت عبدالعزيز الخالدي (المشرف الرئيسي)',
      internalExaminer: 'د. حسام بن طارق الشريف (ممتحن داخلي)',
      externalExaminer: 'أ.د. ماجد بن سعود السبيعي (ممتحن خارجي - جامعة الملك فهد)',
      status: 'scheduled'
    },
    evaluations: [
      {
        id: 'eval-1',
        evaluatorRole: 'supervisor',
        evaluatorName: 'أ.د. ريم الخالدي',
        scores: {
          problemSignificance: 15,
          literatureMethodology: 19,
          technicalImplementation: 34,
          documentationReport: 14,
          presentationDefense: 14
        },
        totalScore: 96,
        feedback: 'أداء الفريق طوال الفصلين كان استثنائياً والتزامهم بالجداول الزمنية نموذج يحتذى به.',
        submittedAt: '2027-01-29'
      }
    ],
    tags: ['ذكاء اصطناعي', 'رؤية حاسوبية', 'إنترنت الأشياء', 'زراعة دقيقة', 'حوسبة طرفية']
  },
  {
    id: 'prj-102',
    code: 'SWE-GP2-2026-04',
    title: 'منصة لا مركزية لإدارة ومصادقة السجلات الأكاديمية والشهادات الجامعية بسلاسل الكتل (UniTrust Ledger)',
    titleEn: 'UniTrust Ledger: Decentralized Academic Credential Verification via Permissioned Blockchain',
    department: 'قسم هندسة البرمجيات وتكنولوجيا المعلومات',
    academicYear: '2026 / 2027',
    term: 'الفصل الدراسي الثاني (مشروع تخرج 2)',
    category: 'graduation_2',
    abstract: 'تطوير بنية برمجية موثوقة لمنع تزوير الشهادات والوثائق الأكاديمية والتحقق الفوري منها عالمياً باستخدام شبكة Hyperledger Fabric المصرح بها، مع دعم المعايير المفتوحة للشهادات الرقمية (W3C Verifiable Credentials).',
    objectives: [
      'تصميم وتنفيذ عقود ذكية متوافقة مع متطلبات الخصوصية وحماية البيانات الشخصية.',
      'توفير بوابة سحابية للمؤسسات والشركات للتحقق من مصداقية وثائق الخريجين في أقل من 3 ثوانٍ.',
      'تكامل واجهات برمجة التطبيقات مع أنظمة القبول والتسجيل الجامعية الحالية (Banner/Oracle).',
      'بناء محفظة رقمية مشفرة للطالب على الهواتف الذكية لحفظ شارات الإنجاز والشهادات.'
    ],
    methodology: 'تم استخدام المنهج المعماري القائم على الخدمات المصغرة (Microservices Architecture) مع تصميم موجه بالنطاق (DDD) واختبارات كفاءة وضغط لشبكة الكتل.',
    status: 'in_progress',
    progressPercentage: 78,
    createdAt: '2026-09-12',
    lastActivity: 'منذ يوم واحد',
    supervisor: FACULTY_MEMBERS[1],
    students: [
      {
        id: 'std-04',
        name: 'عمر بن خالد الناصر',
        studentId: '441006543',
        email: 'o.alnasser@student.edu.sa',
        role: 'مطور العقود الذكية ومهندس النظم الموزعة',
        gpa: '4.65 / 5.00'
      },
      {
        id: 'std-05',
        name: 'فهد بن سلمان المطيري',
        studentId: '441008776',
        email: 'f.almutairi@student.edu.sa',
        role: 'مطور الواجهات الخلفية وأمن التطبيقات',
        gpa: '4.70 / 5.00'
      }
    ],
    milestones: [
      {
        id: 'ms-201',
        title: 'المتطلبات ومعمارية النظام والموافقة التنظيمية',
        description: 'دراسة الأنظمة واللوائح الأكاديمية وتحليل متطلبات الأمان.',
        dueDate: '2026-10-18',
        weightPercentage: 20,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-202',
        title: 'نشر شبكة الكتل المصرح بها وتطوير العقود الذكية',
        description: 'بناء 4 عقد جامعية موزعة وكتابة عقود الأمان والاعتماد الرقمي.',
        dueDate: '2026-12-05',
        weightPercentage: 30,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-203',
        title: 'بوابة التحقق وتطبيق المحفظة الرقمية',
        description: 'تطوير تطبيق الهاتف والواجهة السحابية للشركات الراغبة بالتحقق.',
        dueDate: '2027-01-30',
        weightPercentage: 30,
        status: 'in_progress',
        deliverableRequired: true
      },
      {
        id: 'ms-204',
        title: 'اختبارات الاختراق والتقرير النهائي والمناقشة',
        description: 'فحص الثغرات الأمنية وإعداد الوثائق النهائية وجلسة الحكم.',
        dueDate: '2027-02-24',
        weightPercentage: 20,
        status: 'upcoming',
        deliverableRequired: true
      }
    ],
    deliverables: [
      {
        id: 'del-201',
        milestoneId: 'ms-201',
        title: 'وثيقة المتطلبات والمواصفات المعمارية (SRS Doc)',
        submittedBy: 'عمر بن خالد الناصر',
        submittedAt: '2026-10-17',
        version: '1.1',
        fileName: 'UniTrust_SRS_Architecture_v1.1.pdf',
        fileSize: '6.2 MB',
        plagiarismSimilarity: 5.1,
        status: 'approved',
        grade: 93,
        feedback: []
      }
    ],
    tasks: [
      {
        id: 'tsk-201',
        title: 'تطوير مكون مسح رمز الاستجابة السريع (QR Verifier)',
        description: 'دعم التحقق دون اتصال باستخدام التوقيعات الرقمية غير المتماثلة.',
        assignedTo: 'فهد بن سلمان المطيري',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-10'
      },
      {
        id: 'tsk-202',
        title: 'محاكاة هجمات 51% وفحص أمان العقود الذكية',
        description: 'استخدام أدوات الفحص الاستاتيكي لكشف ثغرات إعادة الدخول (Reentrancy).',
        assignedTo: 'عمر بن خالد الناصر',
        status: 'todo',
        priority: 'medium',
        dueDate: '2027-02-15'
      }
    ],
    supervisoryMeetings: [
      {
        id: 'meet-201',
        date: '2026-11-20',
        time: '12:00 م',
        location: 'مكتب رئيس قسم هندسة البرمجيات',
        agenda: 'مراجعة سرعة إتمام المعاملات على شبكة الكتل واستهلاك الموارد',
        outcomes: 'تم تحقيق معدل 450 معاملة في الثانية وهو كافٍ تماماً لنطاق الجامعات.',
        actionItems: ['توثيق نتائج قياس الأداء في الفصل الرابع من التقرير'],
        nextMeetingDate: '2027-01-10',
        supervisorSignature: true,
        attendedStudents: ['عمر بن خالد الناصر', 'فهد بن سلمان المطيري']
      }
    ],
    evaluations: [],
    tags: ['سلاسل الكتل', 'أمن المعلومات', 'هندسة البرمجيات', 'هوية رقمية', 'Hyperledger']
  },
  {
    id: 'prj-103',
    code: 'CYB-GP1-2026-08',
    title: 'محرك استخباراتي للكشف عن التهديدات المتقدمة المستمرة (APT) في شبكات البنية التحتية الحيوية',
    titleEn: 'CyberSentinel: Intelligence Engine for APT Detection in Critical Infrastructure OT/ICS Networks',
    department: 'قسم الأمن السيبراني والتحري الجنائي الرقمي',
    academicYear: '2026 / 2027',
    term: 'الفصل الدراسي الأول (مشروع تخرج 1)',
    category: 'graduation_1',
    abstract: 'مشروع بحثي وتطبيقي يركز على رصد الهجمات الصامتة والمعقدة في شبكات التحكم الصناعي (SCADA/ICS) من خلال تحليل سلوك حزم البيانات الشبكية باستخدام تقنيات التعلم غير الخاضع للإشراف (Unsupervised Anomaly Detection).',
    objectives: [
      'تجميع وتحليل بيانات بروتوكولات Modbus وDNP3 الصناعية.',
      'كشف أنماط التسلل الجانبي (Lateral Movement) قبل تنفيذ التخريب الفيزيائي.',
      'بناء لوحة استجابة للحوادث السيبرانية موجهة لفرق مراكز العمليات الأمنية (SOC).'
    ],
    methodology: 'استخدام بيئة محاكاة شبكية مغلقة (Testbed) مع ضخ سيناريوهات هجمات واقعية تحاكي هجمات Stuxnet وIndustroyer.',
    status: 'proposal_approved',
    progressPercentage: 45,
    createdAt: '2026-10-01',
    lastActivity: 'منذ 3 أيام',
    supervisor: FACULTY_MEMBERS[2],
    students: [
      {
        id: 'std-06',
        name: 'سعود بن عبدالعزيز التميمي',
        studentId: '442001122',
        email: 's.altamimi@student.edu.sa',
        role: 'باحث ومحلل حركة الشبكات الصناعية',
        gpa: '4.91 / 5.00'
      },
      {
        id: 'std-07',
        name: 'ماجد بن إبراهيم الحازمي',
        studentId: '442003344',
        email: 'm.alhazmi@student.edu.sa',
        role: 'مطور نماذج الكشف الشاذ وهندسة الميزات',
        gpa: '4.80 / 5.00'
      }
    ],
    milestones: [
      {
        id: 'ms-301',
        title: 'المسح الأدبي وبناء معمل المحاكاة الافتراضي',
        description: 'إعداد الخوادم والمحاكيات لأنظمة SCADA وتوثيق بروتوكولات الاختبار.',
        dueDate: '2026-11-10',
        weightPercentage: 30,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-302',
        title: 'استخراج الميزات وتدريب مصنف الكشف الشاذ',
        description: 'بناء نموذج Autoencoder للكشف اللحظي عن الانحرافات البروتوكولية.',
        dueDate: '2027-01-15',
        weightPercentage: 40,
        status: 'in_progress',
        deliverableRequired: true
      },
      {
        id: 'ms-303',
        title: 'تقرير مشروع تخرج 1 والاختبار التمهيدي',
        description: 'تسليم المسودة الأولى وتقديم العرض التمهيدي أمام لجنة القسم.',
        dueDate: '2027-02-28',
        weightPercentage: 30,
        status: 'upcoming',
        deliverableRequired: true
      }
    ],
    deliverables: [
      {
        id: 'del-301',
        milestoneId: 'ms-301',
        title: 'تقرير معمل الاختبار والمسح الأدبي للتهديدات (Literature Review)',
        submittedBy: 'سعود بن عبدالعزيز التميمي',
        submittedAt: '2026-11-09',
        version: '1.0',
        fileName: 'CyberSentinel_LitReview_Testbed.pdf',
        fileSize: '8.1 MB',
        plagiarismSimilarity: 4.8,
        status: 'approved',
        grade: 94,
        feedback: []
      }
    ],
    tasks: [
      {
        id: 'tsk-301',
        title: 'التقاط حركة البيانات لحقن أوامر Modbus غير المصرح بها',
        description: 'توليد عينات الهجوم لتغذية نموذج التدريب.',
        assignedTo: 'سعود بن عبدالعزيز التميمي',
        status: 'done',
        priority: 'high',
        dueDate: '2026-12-20'
      },
      {
        id: 'tsk-302',
        title: 'معايرة عتبة الإنذار لتقليل الإنذارات الكاذبة (False Positives)',
        description: 'الهدف الوصول لمعدل إنذارات كاذبة أقل من 1.5%.',
        assignedTo: 'ماجد بن إبراهيم الحازمي',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-05'
      }
    ],
    supervisoryMeetings: [
      {
        id: 'meet-301',
        date: '2026-12-14',
        time: '09:00 ص',
        location: 'معمل الأمن السيبراني المتقدم',
        agenda: 'مراجعة مجموعة البيانات وتقييم شموليتها لبروتوكولات الأنظمة الصناعية',
        outcomes: 'تم اعتماد مجموعة البيانات مع توجيه بضرورة تضمين حركة مرور الشبكة في أوقات الذروة.',
        actionItems: ['إعادة التدريب على بيانات 72 ساعة متواصلة'],
        nextMeetingDate: '2027-01-20',
        supervisorSignature: true,
        attendedStudents: ['سعود بن عبدالعزيز التميمي', 'ماجد بن إبراهيم الحازمي']
      }
    ],
    evaluations: [],
    tags: ['أمن سيبراني', 'تحكم صناعي', 'كشف الشذوذ', 'استخبارات التهديدات', 'SCADA']
  },
  {
    id: 'prj-104',
    code: 'MST-THS-2026-02',
    title: 'توليد الشروحات البرمجية الدقيقة باللغة العربية للأنظمة القديمة باستخدام النماذج اللغوية الكبيرة المتخصصة',
    titleEn: 'Arabic Code Summarization for Legacy Software Systems Using Specialized Domain LLMs',
    department: 'قسم الذكاء الاصطناعي وعلم البيانات',
    academicYear: '2026 / 2027',
    term: 'رسالة ماجستير في علوم الحاسب',
    category: 'master_thesis',
    abstract: 'أطروحة ماجستير تدرس مشكلة توثيق الأنظمة الحكومية والبنكية القديمة (مثل أنظمة COBOL وJava 6) من خلال ضبط دقيق (Fine-tuning) لنماذج توليدية مفتوحة المصدر لإنتاج وثائق هندسية احترافية باللغة العربية الفصحى مع الحفاظ على المصطلحات التقنية المعيارية.',
    objectives: [
      'بناء مكنز لغوي تقني موازي يربط كتل الأكواد البرمجية بوثائقها باللغة العربية.',
      'مقارنة تقنيات التوليد المعزز بالاسترجاع (RAG) والضبط الدقيق (LoRA) على سرعة التوثيق ودقته.',
      'تطوير أداة إضافية لبيئات التطوير البرمجية (VS Code Extension) تتيح للمبرمجين توليد الشروح فورياً.'
    ],
    methodology: 'تقييم تجريبي باستخدام مقاييس BLEU وROUGE بالإضافة إلى دراسة تجريبية بشرية مع 30 مهندس برمجيات محلي.',
    status: 'in_progress',
    progressPercentage: 65,
    createdAt: '2026-08-25',
    lastActivity: 'منذ 5 ساعات',
    supervisor: FACULTY_MEMBERS[0],
    students: [
      {
        id: 'std-08',
        name: 'الباحثة: نورة بنت سليمان الدخيل',
        studentId: '439002190',
        email: 'n.aldakheel@grad.edu.sa',
        role: 'باحثة ماجستير في الذكاء الاصطناعي',
        gpa: '4.96 / 5.00'
      }
    ],
    milestones: [
      {
        id: 'ms-401',
        title: 'اعتماد مخطط الرسالة وموافقة مجلس القسم',
        description: 'إقرار خطة البحث في مجلس عمادة الدراسات العليا.',
        dueDate: '2026-09-30',
        weightPercentage: 15,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-402',
        title: 'بناء وتوسيم مجموعة البيانات التقنية العربية',
        description: 'تجميع 50,000 زوج من الأكواد البرمجية والتوصيفات العربية المحكمة.',
        dueDate: '2026-11-30',
        weightPercentage: 25,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-403',
        title: 'الضبط الدقيق وتجارب التقييم المقارن',
        description: 'تدريب النماذج ومقارنة النتائج مع GPT-4 وClaude وLlama.',
        dueDate: '2027-02-15',
        weightPercentage: 35,
        status: 'in_progress',
        deliverableRequired: true
      },
      {
        id: 'ms-404',
        title: 'كتابة الرسالة النهائية ومناقشة الأطروحة',
        description: 'تسليم الفصول الخمسة ونيل موافقة التحكيم العلمي الخارجي.',
        dueDate: '2027-04-10',
        weightPercentage: 25,
        status: 'upcoming',
        deliverableRequired: true
      }
    ],
    deliverables: [
      {
        id: 'del-401',
        milestoneId: 'ms-401',
        title: 'مخطط رسالة الماجستير المعتمد (Master Thesis Proposal)',
        submittedBy: 'نورة بنت سليمان الدخيل',
        submittedAt: '2026-09-28',
        version: '1.0',
        fileName: 'Master_Thesis_Proposal_Aldakheel.pdf',
        fileSize: '3.4 MB',
        plagiarismSimilarity: 3.2,
        status: 'approved',
        grade: 99,
        feedback: []
      }
    ],
    tasks: [
      {
        id: 'tsk-401',
        title: 'حساب مصفوفة ROUGE-L للشروح العربية المولدة',
        description: 'استخراج نتائج الدقة والمطابقة الدلالية.',
        assignedTo: 'نورة بنت سليمان الدخيل',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-08'
      }
    ],
    supervisoryMeetings: [
      {
        id: 'meet-401',
        date: '2027-01-12',
        time: '10:00 ص',
        location: 'مكتب أ.د. ريم الخالدي',
        agenda: 'مناقشة نتائج فحص تقييم الخبراء البشري ومقارنته بالمقاييس الآلية',
        outcomes: 'أظهر التقييم البشري تفوق النموذج المضبوط بنسبة 81% في المصطلحات القضائية والتنظيمية.',
        actionItems: ['إعداد ورقة بحثية مصغرة لتقديمها في مؤتمر IEEE'],
        nextMeetingDate: '2027-02-10',
        supervisorSignature: true,
        attendedStudents: ['نورة بنت سليمان الدخيل']
      }
    ],
    evaluations: [],
    tags: ['معالجة لغات طبيعية', 'أطروحة ماجستير', 'نماذج لغوية', 'هندسة عكسية', 'توثيق البرمجيات']
  },
  {
    id: 'prj-105',
    code: 'INF-GP2-2026-11',
    title: 'نظام التوجيه الملاحي الداخلي للمستشفيات والمرافق الطبية بالواقع المعزز (NaviCare AR)',
    titleEn: 'NaviCare AR: Augmented Reality Indoor Navigation System for Complex Healthcare Facilities',
    department: 'قسم نظم المعلومات',
    academicYear: '2026 / 2027',
    term: 'الفصل الدراسي الثاني (مشروع تخرج 2)',
    category: 'graduation_2',
    abstract: 'تطبيق للمرضى والزوار في المدن الطبية والمستشفيات التخصصية، يستخدم إشارات البلوتوث منخفضة الطاقة (BLE Beacons) والتعرف البصري على البيئة لتوجيه المستخدمين خطوة بخطوة بالواقع المعزز إلى العيادات والمختبرات والصيدليات مع تكامل مع نظام المواعيد.',
    objectives: [
      'توفير توجيه داخلي بدقة تقل عن 1.2 متر دون الحاجة لنظام GPS.',
      'دعم مسارات مخصصة لذوي الاحتياجات الخاصة (كراسي متحركة، مصاعد بديلة).',
      'تخفيف العبء عن مكاتب الاستقبال بنسبة تتجاوز 40% في المستشفيات الكبرى.'
    ],
    methodology: 'تصميم تجربة المستخدم القائمة على الأبحاث الميدانية (Human-Centered Design) مع اختبارات قابلية استخدام دورية مع مختلف الفئات العمرية.',
    status: 'in_progress',
    progressPercentage: 84,
    createdAt: '2026-09-15',
    lastActivity: 'منذ يومين',
    supervisor: FACULTY_MEMBERS[3],
    students: [
      {
        id: 'std-09',
        name: 'فيصل بن منصور العريفي',
        studentId: '441005511',
        email: 'f.alarifi@student.edu.sa',
        role: 'مطور الواقع المعزز وتطبيقات الهواتف',
        gpa: '4.72 / 5.00'
      },
      {
        id: 'std-10',
        name: 'سارة بنت حمود الشمري',
        studentId: '441007799',
        email: 's.alshammari@student.edu.sa',
        role: 'مصممة واجهات ومحللة نظم الرعاية الصحية',
        gpa: '4.85 / 5.00'
      }
    ],
    milestones: [
      {
        id: 'ms-501',
        title: 'تحليل المتطلبات وتخطيط الخريطة الرقمية ثلاثية الأبعاد',
        description: 'رسم خرائط الأدوار ومسارات الحركة في المستشفى التجريبي.',
        dueDate: '2026-10-25',
        weightPercentage: 25,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-502',
        title: 'معايرة نقاط البلوتوث وبرمجة محرك الملاحة بالواقع المعزز',
        description: 'تكامل Unity وARKit مع شبكة الحساسات المكانية.',
        dueDate: '2026-12-20',
        weightPercentage: 35,
        status: 'completed',
        deliverableRequired: true
      },
      {
        id: 'ms-503',
        title: 'الاختبارات السريرية ومسودة التقرير النهائي',
        description: 'تجربة التطبيق مع 50 زائراً في مستشفى الملك خالد الجامعي.',
        dueDate: '2027-02-05',
        weightPercentage: 20,
        status: 'in_progress',
        deliverableRequired: true
      },
      {
        id: 'ms-504',
        title: 'جلسة التحكيم والعرض التوضيحي الميداني',
        description: 'المناقشة أمام اللجنة المختصة وتقديم التقارير النهائية.',
        dueDate: '2027-02-25',
        weightPercentage: 20,
        status: 'upcoming',
        deliverableRequired: true
      }
    ],
    deliverables: [
      {
        id: 'del-501',
        milestoneId: 'ms-501',
        title: 'وثيقة المواصفات وتصميم تجربة المستخدم (UI/UX Case Study)',
        submittedBy: 'سارة بنت حمود الشمري',
        submittedAt: '2026-10-24',
        version: '1.2',
        fileName: 'NaviCare_UIUX_Report_v1.2.pdf',
        fileSize: '14.2 MB',
        plagiarismSimilarity: 4.0,
        status: 'approved',
        grade: 97,
        feedback: []
      }
    ],
    tasks: [
      {
        id: 'tsk-501',
        title: 'إضافة التنبيهات الصوتية الإرشادية للمكفوفين وضعاف البصر',
        description: 'دعم التوجيه الصوتي باللغتين العربية والإنجليزية.',
        assignedTo: 'فيصل بن منصور العريفي',
        status: 'in_progress',
        priority: 'high',
        dueDate: '2027-02-12'
      }
    ],
    supervisoryMeetings: [
      {
        id: 'meet-501',
        date: '2026-12-22',
        time: '11:30 ص',
        location: 'مكتب د. سارة العتيبي',
        agenda: 'مراجعة نتائج استبيان رضا المستخدمين بعد الاختبار الميداني',
        outcomes: 'معدل رضا 92% وسهولة ملحوظة في الوصول للمختبرات في الطابق السفلي.',
        actionItems: ['إبراز نتائج الاستبيان في فصل مناقشة النتائج'],
        nextMeetingDate: '2027-01-25',
        supervisorSignature: true,
        attendedStudents: ['فيصل بن منصور العريفي', 'سارة بنت حمود الشمري']
      }
    ],
    evaluations: [],
    tags: ['واقع معزز', 'نظم معلومات صحية', 'ملاحة داخلية', 'إنترنت الأشياء', 'تجربة المستخدم']
  }
];

export const DEPARTMENTS = [
  'جميع الأقسام الأكاديمية',
  'قسم الذكاء الاصطناعي وعلم البيانات',
  'قسم هندسة البرمجيات وتكنولوجيا المعلومات',
  'قسم الأمن السيبراني والتحري الجنائي الرقمي',
  'قسم نظم المعلومات',
  'قسم هندسة الحاسوب والشبكات'
];
