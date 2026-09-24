// 随机事件数据库
export const randomEvents = [
  {
    id: 'random_stock_tip',
    title: '📱 群里有人发股票代码',
    description: '炒股群里有人发了一只股票代码，说是内幕消息...',
    dialogue: '又来？这次是真是假？要不要土块一把？',
    probability: 0.2,
    choices: [
      {
        text: '🎰 冲！梭哈！',
        effect: { money: -2000, luck: 20, stress: 30 },
        dialogue: '土块才有乐子！冲就完了！赌一波！',
      },
      {
        text: '🚫 无视，肯定是坑',
        effect: { intelligence: 5 },
        dialogue: '老子不上当！骗子太多了！',
      }
    ]
  },

  {
    id: 'random_exam',
    title: '📝 突击考试',
    description: '教授突然宣布今天小测验！你昨晚通宵打游戏...',
    dialogue: '我透！完了完了！怎么突然考试？！',
    probability: 0.15,
    choices: [
      {
        text: '😰 硬着头皮考',
        effect: { stress: 20, health: -10 },
        dialogue: '只能靠蒙了...天灵灵地灵灵！',
      },
      {
        text: '🤝 抄学霸的',
        effect: { social: -5, intelligence: 5 },
        dialogue: '兄弟，借我康康！救我狗命！',
        requirements: { social: 60 }
      },
      {
        text: '😴 放弃，趴着睡',
        effect: { health: 10, reputation: -10, stress: -20 },
        dialogue: '老子躺平了！爱咋咋地！',
      }
    ]
  },

  {
    id: 'random_party',
    title: '🍺 室友聚会',
    description: '室友们约你去KTV唱歌放松...',
    dialogue: '乐子来了！终于可以嗨一下了！',
    probability: 0.15,
    choices: [
      {
        text: '🎤 去玩！嗨翻天！',
        effect: { social: 15, stress: -15, money: -300, health: -5 },
        dialogue: 'ok！放松一下！今晚不醉不归！',
      },
      {
        text: '📚 拒绝，要学习',
        effect: { intelligence: 10, social: -5 },
        dialogue: '老子有正事！你们去浪吧！',
      }
    ]
  },

  {
    id: 'random_sick',
    title: '🤒 感冒发烧',
    description: '你感冒了，头昏脑涨的...',
    dialogue: '我透...身体不行了啊！要倒下了！',
    probability: 0.1,
    choices: [
      {
        text: '🏥 去医院',
        effect: { health: 30, money: -200, stress: -10 },
        dialogue: '还是看医生吧！健康第一！',
      },
      {
        text: '💊 买药硬扛',
        effect: { health: 10, money: -50 },
        dialogue: '小感冒而已！吃点药就好了！',
      },
      {
        text: '😴 睡觉',
        effect: { health: 5, stress: -15 },
        dialogue: '睡一觉就好了！身体自己会恢复！',
      }
    ]
  },

  {
    id: 'random_scholarship',
    title: '🏆 奖学金评选',
    description: '学校要评奖学金了，你成绩还不错...',
    dialogue: 'ok！机会来了！能拿钱吗？',
    probability: 0.1,
    choices: [
      {
        text: '✍️ 认真准备材料',
        effect: { stress: 20, reputation: 10 },
        dialogue: '冲冲冲！老子要拿奖学金！',
      },
      {
        text: '😌 随便写写',
        effect: { stress: -5 },
        dialogue: '无所谓了！能拿就拿，不强求！',
      }
    ]
  },

  {
    id: 'random_love',
    title: '💕 有人向你表白',
    description: '一个同学向你表白了...',
    dialogue: '我透！什么情况？！老子魅力这么大？',
    probability: 0.08,
    choices: [
      {
        text: '💘 答应试试',
        effect: { social: 20, stress: 10, money: -500 },
        dialogue: 'ok！试试吧！谈恋爱也不错！',
      },
      {
        text: '🚫 拒绝',
        effect: { stress: -10, social: -10 },
        dialogue: '对不起...老子还要搞钱！',
      },
      {
        text: '🤔 考虑考虑',
        effect: { stress: 15 },
        dialogue: '让我想想...这个太突然了！',
      }
    ]
  },

  {
    id: 'random_laptop_broken',
    title: '💻 电脑坏了',
    description: '你的笔记本电脑突然黑屏了...',
    dialogue: '我是猪啊！怎么这个时候坏？！',
    probability: 0.1,
    choices: [
      {
        text: '🛠️ 修理',
        effect: { money: -800, stress: 10 },
        dialogue: '修修看吧！应该能修好！',
      },
      {
        text: '💰 买新的',
        effect: { money: -5000, stress: -10 },
        dialogue: '土块一把！买个好的！一步到位！',
        requirements: { money: 5000 }
      },
      {
        text: '😭 用手机凑合',
        effect: { intelligence: -5, stress: 20 },
        dialogue: '没钱买了...手机用用吧...',
      }
    ]
  },

  {
    id: 'random_competition',
    title: '🏅 炒股大赛',
    description: '学校举办模拟炒股大赛，奖金1万元！',
    dialogue: '这个可以啊！老子的专长！无敌的机会！',
    probability: 0.12,
    choices: [
      {
        text: '🎯 参加！冲冠军！',
        effect: { stress: 25, financialKnowledge: 10 },
        dialogue: '无敌的！冠军我要定了！',
      },
      {
        text: '😌 佛系参与',
        effect: { stress: 5, social: 5 },
        dialogue: '随便玩玩！重在参与！',
      },
      {
        text: '🚫 不参加',
        effect: {},
        dialogue: '懒得搞了！有这时间还不如睡觉！',
      }
    ]
  },

  {
    id: 'random_scam',
    title: '📧 诈骗短信',
    description: '你收到短信："恭喜中奖50万！点击链接领取！"',
    dialogue: '这么假的骗局？当老子是傻子？',
    probability: 0.15,
    choices: [
      {
        text: '🧠 无视删除',
        effect: { intelligence: 5 },
        dialogue: '滚蛋！垃圾骗子！',
      },
      {
        text: '😱 点进去看看',
        effect: { money: -1000, intelligence: -10, stress: 30 },
        dialogue: '我是猪啊！怎么会点进去？！完了！',
      }
    ]
  },

  {
    id: 'random_lottery',
    title: '🎰 彩票中奖',
    description: '路过彩票店随手买的彩票居然中了5000块！',
    dialogue: '我透！667！老子运气爆棚啊！',
    probability: 0.05,
    choices: [
      {
        text: '💰 领奖！',
        effect: { money: 5000, luck: 10, stress: -20 },
        dialogue: '太强了！我无敌的！天选之人！',
      }
    ]
  },

  {
    id: 'random_fight',
    title: '😡 室友矛盾',
    description: '你和室友因为一点小事吵起来了...',
    dialogue: '我透！什么猪队友？！气死老子了！',
    probability: 0.1,
    choices: [
      {
        text: '🤝 主动和解',
        effect: { social: 15, stress: -10 },
        dialogue: 'ok，算了算了。大家都冷静！',
      },
      {
        text: '😤 继续刚',
        effect: { social: -20, stress: 30 },
        dialogue: '老子不服！凭什么让步？！',
      },
      {
        text: '😭 冷战',
        effect: { social: -10, stress: 15 },
        dialogue: '懒得理你！爱咋咋地！',
      }
    ]
  },

  {
    id: 'random_internship_call',
    title: '📞 实习面试邀请',
    description: '一家公司打电话邀请你去面试...',
    dialogue: 'ok！机会来了！表现的机会！',
    probability: 0.12,
    choices: [
      {
        text: '✅ 去面试',
        effect: { stress: 15, reputation: 5 },
        dialogue: '冲冲冲！老子要拿下这个机会！',
      },
      {
        text: '🚫 拒绝',
        effect: { stress: -5 },
        dialogue: '算了！老子不去了！',
      }
    ]
  },

  {
    id: 'random_game_addict',
    title: '🎮 游戏沉迷',
    description: '新游戏太好玩了，你已经连续玩了3天...',
    dialogue: '乐子太多了！停不下来啊！',
    probability: 0.1,
    choices: [
      {
        text: '😰 继续玩',
        effect: { health: -15, stress: -20, intelligence: -5 },
        dialogue: '再玩一把！就一把！',
      },
      {
        text: '💪 强制自己停下',
        effect: { health: 5, stress: 10, intelligence: 10 },
        dialogue: '不能再玩了！老子要自律！',
      }
    ]
  },

  {
    id: 'random_food_poisoning',
    title: '🤢 食物中毒',
    description: '食堂的饭吃坏肚子了...',
    dialogue: '我透！食堂什么垃圾？！',
    probability: 0.08,
    choices: [
      {
        text: '🏥 去医院',
        effect: { health: 20, money: -300 },
        dialogue: '受不了了！快去医院！',
      },
      {
        text: '💊 买药',
        effect: { health: 10, money: -50 },
        dialogue: '吃点药应该就好了...',
      }
    ]
  },

  {
    id: 'random_investment_advice',
    title: '💡 学长给投资建议',
    description: '学长说他有个稳赚的投资机会...',
    dialogue: '又来？这次靠谱吗？',
    probability: 0.15,
    choices: [
      {
        text: '💰 投资',
        effect: { money: -3000, luck: 15, stress: 25 },
        dialogue: '土块一把！相信学长！',
      },
      {
        text: '🤔 观望',
        effect: { intelligence: 5 },
        dialogue: '先看看情况再说！',
      },
      {
        text: '🚫 拒绝',
        effect: { stress: -5 },
        dialogue: '老子不信！太玄学了！',
      }
    ]
  },

  {
    id: 'random_campus_activity',
    title: '🎪 校园活动邀请',
    description: '学生会在办金融论坛，邀请你去当嘉宾分享经验...',
    dialogue: '我透！老子成大佬了？要上台演讲？',
    probability: 0.12,
    choices: [
      {
        text: '🎤 去！展示实力',
        effect: { social: 20, reputation: 15, stress: 20 },
        dialogue: 'ok！社牛本色！让他们看看什么叫专业！',
      },
      {
        text: '😅 太紧张，不去',
        effect: { stress: -10, social: -5 },
        dialogue: '我透...上台说话腿软啊！还是算了！',
      },
      {
        text: '🤝 拉室友一起',
        effect: { social: 25, stress: 10 },
        dialogue: '一个人太虚了！叫上兄弟壮壮胆！',
        requirements: { social: 70 }
      }
    ]
  },

  {
    id: 'random_stock_crash',
    title: '📉 黑天鹅事件',
    description: '市场突发暴跌！你的持仓全绿了！',
    dialogue: '我是猪啊！怎么又跌了？！',
    probability: 0.1,
    choices: [
      {
        text: '😱 恐慌卖出',
        effect: { money: -1500, stress: -20 },
        dialogue: '跑跑跑！再不跑就完了！',
      },
      {
        text: '💎 死扛',
        effect: { stress: 40, riskTolerance: 15 },
        dialogue: '土块就要扛到底！不割肉！',
      },
      {
        text: '📊 抄底',
        effect: { money: -2000, intelligence: 10 },
        dialogue: '危机就是机会！越跌越买！',
        requirements: { money: 2000 }
      }
    ]
  },

  {
    id: 'random_birthday',
    title: '🎂 学姐生日',
    description: '学姐生日，邀请你去参加生日会...',
    dialogue: 'ok！机会来了！要不要送礼物？',
    probability: 0.08,
    choices: [
      {
        text: '🎁 送贵重礼物',
        effect: { money: -800, social: 25, stress: 10 },
        dialogue: '土块一把！买个好的！给学姐留个好印象！',
        requirements: { money: 800 }
      },
      {
        text: '🎈 随便买个小礼物',
        effect: { money: -200, social: 10 },
        dialogue: '意思一下就行了！太贵了老子也买不起！',
      },
      {
        text: '😅 空手去',
        effect: { social: -10, money: 0 },
        dialogue: '我透...钱包空了！就去吃个饭吧！',
      }
    ]
  },

  {
    id: 'random_mentor_dinner',
    title: '🍽️ 教授请吃饭',
    description: '教授说要请你和几个优秀学生吃饭，还有业界大佬...',
    dialogue: '我透！高端局？老子能行吗？',
    probability: 0.1,
    choices: [
      {
        text: '✅ 去！认识大佬',
        effect: { social: 20, reputation: 15, stress: 15 },
        dialogue: '无敌的机会！老子要抓住！',
      },
      {
        text: '😰 太紧张不敢去',
        effect: { stress: -5, reputation: -10 },
        dialogue: '怕说错话丢人...还是算了吧...',
      },
      {
        text: '🤔 问问穿什么',
        effect: { social: 15, intelligence: 5, stress: 10 },
        dialogue: 'ok，得体面一点！先问问着装要求！',
      }
    ]
  },

  {
    id: 'random_side_job',
    title: '💼 兼职机会',
    description: '有个学长的公司招人做兼职分析师，一小时200块...',
    dialogue: 'ok！搞钱机会来了！',
    probability: 0.15,
    choices: [
      {
        text: '✅ 接！搞钱',
        effect: { money: 1500, stress: 20, health: -10 },
        dialogue: '冲冲冲！虽然累但是钱香啊！',
      },
      {
        text: '🚫 拒绝，专心学习',
        effect: { intelligence: 10, stress: -5 },
        dialogue: '还是学业要紧！钱以后再赚！',
      },
      {
        text: '🤔 先谈谈价格',
        effect: { money: 2000, social: 10, stress: 25 },
        dialogue: '老子值更多！300一小时怎么样？',
        requirements: { social: 75 }
      }
    ]
  },

  {
    id: 'random_gym',
    title: '🏃 身体警报',
    description: '最近总熬夜，身体有点扛不住了...',
    dialogue: '我透...老子要倒下了！',
    probability: 0.12,
    choices: [
      {
        text: '💪 办健身卡',
        effect: { money: -500, health: 20, stress: -10 },
        dialogue: 'ok！身体是本钱！得锻炼了！',
      },
      {
        text: '😴 多睡觉',
        effect: { health: 15, stress: -15 },
        dialogue: '睡觉才是王道！躺平休息！',
      },
      {
        text: '💊 买保健品',
        effect: { money: -300, health: 10 },
        dialogue: '吃点维生素！应该能撑住！',
      }
    ]
  },

  {
    id: 'random_insider',
    title: '🤫 内幕消息',
    description: '一个神秘人加你微信，说有内幕消息，要1000块...',
    dialogue: '这么邪门？真的假的？',
    probability: 0.1,
    choices: [
      {
        text: '💰 买消息',
        effect: { money: -1000, luck: 10, stress: 20 },
        dialogue: '土块一把！万一是真的呢！',
      },
      {
        text: '🚫 拉黑',
        effect: { intelligence: 10 },
        dialogue: '骗子！滚蛋！老子不上当！',
      },
      {
        text: '🤔 套话试试',
        effect: { social: 10, intelligence: 8 },
        dialogue: '先聊聊看，能不能白嫖点信息！',
        requirements: { social: 75 }
      }
    ]
  },

  {
    id: 'random_class_skip',
    title: '😴 想翘课',
    description: '今天有个很无聊的课，但是点名很严...',
    dialogue: '去还是不去？纠结啊！',
    probability: 0.15,
    choices: [
      {
        text: '😎 翘了！去玩',
        effect: { stress: -20, health: 10, intelligence: -10 },
        dialogue: '乐子来了！人生得意须尽欢！',
      },
      {
        text: '📚 乖乖上课',
        effect: { intelligence: 8, stress: 10 },
        dialogue: 'ok，还是别冒险了！万一被抓就惨了！',
      },
      {
        text: '🤝 找人代签到',
        effect: { social: 10, stress: -10 },
        dialogue: '兄弟帮忙签个到！老子请你吃饭！',
        requirements: { social: 70 }
      }
    ]
  },

  {
    id: 'random_market_rumor',
    title: '📰 市场传闻',
    description: '网上疯传某只股票要重组，明天就涨停...',
    dialogue: '又是谣言？还是真消息？',
    probability: 0.12,
    choices: [
      {
        text: '🎰 梭哈',
        effect: { money: -3000, luck: 20, stress: 35 },
        dialogue: '土块！就赌这一波！',
        requirements: { money: 3000 }
      },
      {
        text: '🤔 小买一点',
        effect: { money: -1000, luck: 10, stress: 15 },
        dialogue: '试试水！万一是真的呢！',
      },
      {
        text: '🧠 理性分析',
        effect: { intelligence: 10, stress: -5 },
        dialogue: '不能信谣言！得看财报和基本面！',
      }
    ]
  },

  {
    id: 'random_family_call',
    title: '📞 家里来电',
    description: '妈妈打电话问你最近怎么样，要不要寄钱...',
    dialogue: 'ok，想家了啊...',
    probability: 0.1,
    choices: [
      {
        text: '💰 要钱',
        effect: { money: 2000, stress: -10 },
        dialogue: '嘿嘿，那就麻烦妈了！',
      },
      {
        text: '😊 不要，我能行',
        effect: { stress: -15, health: 10 },
        dialogue: '老子自己能赚钱！不用担心！',
      },
      {
        text: '😭 诉苦',
        effect: { money: 3000, stress: -20, reputation: -5 },
        dialogue: '妈...老子好难啊...钱不够用...',
      }
    ]
  },
];
