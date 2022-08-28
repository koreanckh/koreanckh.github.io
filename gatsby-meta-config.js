module.exports = {
  title: `시행착오를 겪다`,
  description: `느낌 정도만 알고있던 지식의 퍼즐을 맞춰보자.`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://koreanckh.github.io/`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `최광훈`,
    bio: {
      role: `개발자`,
      description: ['사람에 가치를 두는', '능동적으로 일하는', '이로운 것을 만드는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: ``, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: ``, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.08 ~',
        activity: '개인 블로그 개발 및 운영',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
      {
        date: '2022.08 ~',
        activity: '사이드프로젝트 참여(플레이덕)',
      },
      {
        date: '2022.03 ~',
        activity: '브이피피랩',
      },
      {
        date: '2021.06 ~ 2022.03',
        activity: '나이스평가정보(파견직)',
      },
      {
        date: '2019.03 ~ 2021.05',
        activity: '피디시스템',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '나는 누구인가',
        description:
          `그동안 주먹구구식으로 코딩을 해온것 같아 조금 더 탐구하는 마음으로 개발을 해보고자 블로그를 작성해보려고 합니다. 정확하지 않은 내용이 있을 수 있으니 참고 및 질타는 언제나 환영입니다!
          감사합니다 :D`,
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'sample.png',
        links: {
          post: '/gatsby-starter-zoomkoding-introduction',
          github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          demo: 'https://www.zoomkoding.com',
        },
      },
    ],
  },
};
