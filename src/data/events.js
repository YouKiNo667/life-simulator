// 事件数据库
import { getRandomDialogue } from './dialogues';

export const events = [
  // 大学第一年 - 新手期
  {
    id: 'welcome_university',
    title: '🎓 大学报到日',
    description: '你背着行李来到大学，室友正在聊天。一个戴眼镜的室友走过来："哥们儿，要不要一起去金融社报名？听说能学炒股！"',
    dialogue: 'ok，新生活开始了！大学生活冲冲冲！',
    year: 1,
    season: '秋季',
    choices: [
      {
        text: '🎯 当然去！我要成为金融大佬',
        effect: { financialKnowledge: 5, social: 10, stress: 5 },
        dialogue: '无敌的！老子要起飞了！土块人生从这里开始！',
        nextEvent: 'finance_club_intro'
      },
      {
        text: '🎮 先去网吧认识新朋友',
        effect: { social: 15, intelligence: -5 },
        dialogue: '乐子来了！先整点快乐再说，反正不急！',
      },
      {
        text: '📚 去图书馆学习',
        effect: { intelligence: 10, social: -5, financialKnowledge: 3 },
        dialogue: '稳健发展，不能当猪。打好基础才是硬道理！',
      }
    ]
  },

  {
    id: 'finance_club_intro',
    title: '💼 金融社第一课',
    description: '社长是个学姐，正在讲股票基础知识。她突然点你："新同学，你知道什么是K线吗？"',
    dialogue: '我透！这谁顶得住...学姐也太漂亮了吧！',
    choices: [
      {
        text: '📊 装懂："当然知道！红涨绿跌！"',
        effect: { reputation: 5, stress: 15, social: 10 },
        dialogue: '装得还行吧？社牛本色发挥出来了！哈哈哈装的挺像！',
        requirements: { social: 70 }
      },
      {
        text: '🙋 老实说不懂，请教学姐',
        effect: { financialKnowledge: 10, intelligence: 5, stress: -10 },
        dialogue: 'ok，学到了。谦虚使人进步啊！稳健发展才是硬道理！',
      },
      {
        text: '🤡 开玩笑："是不是蜡烛图？能许愿吗？"',
        effect: { social: 15, reputation: -5 },
        dialogue: '哈哈哈哈，气氛整活了！乐子人出击！全场都被老子逗笑了！',
      },
      {
        text: '🤔 思考："K线...是不是技术分析的？"',
        effect: { intelligence: 8, financialKnowledge: 5, stress: 5 },
        dialogue: '蒙对了一半！看来老子还是有点底子的！',
      },
      {
        text: '😅 转移话题："学姐，你这么漂亮肯定很懂股票！"',
        effect: { social: 20, stress: 10, reputation: -3 },
        dialogue: '嘿嘿，拍马屁也是一种技能！看学姐笑了没？',
        requirements: { social: 75 }
      }
    ]
  },

  {
    id: 'first_stock_choice',
    title: '💸 室友怂恿你开户',
    description: '室友A拿着手机兴奋地说："哥们儿，我刚开了证券账户！你也来一个？我看好比亚迪，要不要土块一把？"',
    dialogue: '土块？这个我熟啊！终于等到这一刻了！',
    choices: [
      {
        text: '🎰 梭哈！全仓比亚迪',
        effect: { money: -3000, riskTolerance: 20, stress: 30 },
        dialogue: '土块就是要all in！667，看我表演！老子无敌的！',
        nextEvent: 'stock_result_byd',
        action: 'buyStock',
        stock: { id: 'byd_1', name: '比亚迪', cost: 3000, value: 3000 }
      },
      {
        text: '💰 理性投资，买1000块试试',
        effect: { money: -1000, financialKnowledge: 10, intelligence: 5 },
        dialogue: '稳健一点，不能当猪。先试试水温！小心驶得万年船！',
        nextEvent: 'stock_result_byd_small',
        action: 'buyStock',
        stock: { id: 'byd_2', name: '比亚迪', cost: 1000, value: 1000 }
      },
      {
        text: '🚫 不碰股票，太危险',
        effect: { stress: -10, riskTolerance: -10 },
        dialogue: '老子不是韭菜，观望一下再说！股市水太深把握不住！',
        // 没有后续
      },
      {
        text: '📱 先研究研究再说',
        effect: { intelligence: 8, financialKnowledge: 8, stress: 5 },
        dialogue: 'ok，先看看K线图！不能盲目跟风！要有自己的判断！',
        // 没有后续
      },
      {
        text: '🤝 问问学姐意见',
        effect: { social: 10, financialKnowledge: 5, stress: -5 },
        dialogue: '还是请教一下专业人士吧！学姐应该懂得多！',
        requirements: { social: 65 }
        // 没有后续
      },
      {
        text: '😏 "你要是亏了别找我哭"',
        effect: { social: 5, intelligence: 3 },
        dialogue: '哈哈哈，先给你打个预防针！等着看你乐子！',
        // 没有后续
      }
    ]
  },

  {
    id: 'stock_result_byd',
    title: '📈 比亚迪暴涨15%！',
    description: '一周后，你的比亚迪涨了15%！室友们都围过来："我透！大神啊！教教我们！"',
    dialogue: '667！我就说我无敌的！太强了吧我！',
    choices: [
      {
        text: '💰 见好就收，落袋为安',
        effect: { money: 3450, intelligence: 10, stress: -20 },
        dialogue: '太强了！赚了一波就跑！这才是高手操作！知进退才是真大佬！',
        action: 'sellStock',
        stockId: 'byd_1'
      },
      {
        text: '🚀 继续持有，还能涨',
        effect: { riskTolerance: 15, stress: 20 },
        dialogue: '这才哪到哪！土块到底！目标翻倍！涨到天上去！',
        nextEvent: 'stock_crash_event',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3450
      },
      {
        text: '📢 教室友炒股，收学费',
        effect: { money: 200, social: 20, reputation: 10 },
        dialogue: '乐子来了，当导师了！一个人200！排队报名啊！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3450
      },
      {
        text: '💎 加仓！再买2000块',
        effect: { money: -2000, riskTolerance: 25, stress: 30 },
        dialogue: '既然涨了，那就加仓！土块加倍！一路冲到底！',
        requirements: { money: 2000 },
        action: 'updateStockAndBuy',
        stockId: 'byd_1',
        newValue: 3450,
        newStock: { id: 'byd_1_add', name: '比亚迪', cost: 2000, value: 2000 }
      },
      {
        text: '🤔 卖一半，留一半',
        effect: { money: 1725, intelligence: 12, stress: -5 },
        dialogue: 'ok，稳健策略！既能保本又能博取收益！老子太聪明了！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 1725
      },
      {
        text: '📱 发朋友圈炫耀',
        effect: { social: 15, reputation: 8, stress: -15 },
        dialogue: '哈哈哈必须炫一波！让他们看看什么叫股神！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3450
      }
    ]
  },

  {
    id: 'stock_result_byd_small',
    title: '📈 比亚迪涨了15%',
    description: '一周后，你的1000块变成了1150块！虽然赚得不多，但还是赚了！',
    dialogue: 'ok，小赚一笔！稳健投资果然靠谱！',
    choices: [
      {
        text: '💰 卖出，落袋为安',
        effect: { money: 1150, intelligence: 10, stress: -10 },
        dialogue: '赚了150！虽然不多但是稳！',
        action: 'sellStock',
        stockId: 'byd_2'
      },
      {
        text: '🚀 继续持有',
        effect: { riskTolerance: 10, stress: 10 },
        dialogue: '感觉还能涨！先拿着！',
        nextEvent: 'stock_crash_event_small',
        action: 'updateStock',
        stockId: 'byd_2',
        newValue: 1150
      },
      {
        text: '💎 加仓2000',
        effect: { money: -2000, riskTolerance: 15, stress: 20 },
        dialogue: '既然涨了，那就加仓！',
        requirements: { money: 2000 },
        nextEvent: 'stock_crash_event',
        action: 'updateStockAndBuy',
        stockId: 'byd_2',
        newValue: 1150,
        newStock: { id: 'byd_2_add', name: '比亚迪', cost: 2000, value: 2000 }
      }
    ]
  },

  {
    id: 'stock_crash_event',
    title: '📉 市场暴跌！',
    description: '突然，整个市场大跌！你的比亚迪一天跌了8%，群里的人都在哀嚎...',
    dialogue: '我透！什么情况？！刚才还在涨的啊！',
    choices: [
      {
        text: '😱 恐慌性抛售，赶紧跑',
        effect: { money: 3174, stress: -15, intelligence: -5 },
        dialogue: '我是猪啊...早该卖了！慌了慌了！逃命要紧！',
        action: 'sellStock',
        stockId: 'byd_1'
      },
      {
        text: '💎 死扛到底，不割肉',
        effect: { riskTolerance: 20, stress: 40, health: -10 },
        dialogue: '土块的本质就是要扛！不割不割就不割！死了都不卖！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3174
      },
      {
        text: '📊 分析原因，越跌越买',
        effect: { money: -1000, financialKnowledge: 15, intelligence: 10 },
        dialogue: '危机就是机会！现在是抄底良机！巴菲特说的对！',
        requirements: { financialKnowledge: 40 },
        action: 'updateStockAndBuy',
        stockId: 'byd_1',
        newValue: 3174,
        newStock: { id: 'byd_1_dip', name: '比亚迪', cost: 1000, value: 1000 }
      },
      {
        text: '😰 卖一半止损',
        effect: { money: 1587, stress: -5, intelligence: 8 },
        dialogue: '止损还是要的...留一半看看能不能回本！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 1587
      },
      {
        text: '📱 问学姐怎么办',
        effect: { social: 10, stress: -10, financialKnowledge: 5 },
        dialogue: '我透，学姐救命！你说该怎么办？！',
        requirements: { social: 70 },
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3174
      },
      {
        text: '🤡 发朋友圈自嘲',
        effect: { social: 15, stress: -20, reputation: -5 },
        dialogue: '哈哈哈，老子亏麻了！谁还没被割过韭菜啊！',
        action: 'updateStock',
        stockId: 'byd_1',
        newValue: 3174
      }
    ]
  },

  {
    id: 'stock_crash_event_small',
    title: '📉 市场回调',
    description: '市场突然回调，你的比亚迪跌回去了...',
    dialogue: '我透！白赚了？',
    choices: [
      {
        text: '😰 赶紧卖',
        effect: { money: 1058, stress: -10 },
        dialogue: '算了，至少还赚了58！',
        action: 'sellStock',
        stockId: 'byd_2'
      },
      {
        text: '💎 继续持有',
        effect: { stress: 15, intelligence: 5 },
        dialogue: '长期投资！不慌！',
        action: 'updateStock',
        stockId: 'byd_2',
        newValue: 1058
      },
      {
        text: '📊 分析一下',
        effect: { intelligence: 10, financialKnowledge: 8 },
        dialogue: '冷静分析，看看是技术回调还是趋势反转！',
        action: 'updateStock',
        stockId: 'byd_2',
        newValue: 1058
      }
    ]
  },

  {
    id: 'roommate_borrow_money',
    title: '💸 室友借钱炒股',
    description: '室友B找到你："哥们儿，我发现一只妖股，借我5000块，一周还你10000！绝对的！"',
    dialogue: '又来土块？这波是真土块还是假土块？',
    choices: [
      {
        text: '💰 借他，土块一把',
        effect: { money: -5000, social: 20, stress: 25 },
        dialogue: 'ok，看你表演！老子等你翻倍还我！兄弟一场赌一把！',
        nextEvent: 'roommate_lose_money'
      },
      {
        text: '🤔 观望，看看乐子',
        effect: { intelligence: 5, social: 5 },
        dialogue: '我倒要看看你怎么说！先让子弹飞一会儿！',
        nextEvent: 'roommate_lose_money_watch' // 新事件：看着室友亏
      },
      {
        text: '🚫 拒绝，我不是提款机',
        effect: { social: -10, intelligence: 10, stress: -5 },
        dialogue: '别坑老子！这种话听多了都是套路！',
        // 没有nextEvent，不触发后续
      },
      {
        text: '💵 只借2000试试',
        effect: { money: -2000, social: 10, stress: 10 },
        dialogue: '意思一下吧！太多了老子也不放心！',
        nextEvent: 'roommate_lose_money_partial' // 新事件：借了2000的情况
      },
      {
        text: '📝 借，但要打借条',
        effect: { money: -5000, social: 5, intelligence: 12, stress: 15 },
        dialogue: '亲兄弟明算账！必须立字据！白纸黑字写清楚！',
        nextEvent: 'roommate_lose_money'
      },
      {
        text: '🤝 一起投，风险共担',
        effect: { money: -2500, social: 15, riskTolerance: 15, stress: 20 },
        dialogue: '那咱俩合伙！赚了一起分，亏了一起扛！',
        nextEvent: 'roommate_lose_money_partner' // 新事件：合伙投资
      }
    ]
  },

  {
    id: 'roommate_lose_money',
    title: '😭 室友亏光了',
    description: '一周后，室友B苦着脸："兄弟...我亏了...那只股票爆雷了，我只能还你2000..."',
    dialogue: '我就知道...猪队友！老子就不该信你！',
    choices: [
      {
        text: '😤 要钱！必须还！',
        effect: { money: 2000, social: -20, stress: 10 },
        dialogue: '别以为老子好欺负！钱呢钱呢钱呢？！说好的10000呢？！',
      },
      {
        text: '😔 算了，就当交学费',
        effect: { social: 30, reputation: 15, stress: -10 },
        dialogue: 'ok吧，看在室友的份上。下次别找我了！破财免灾！',
      },
      {
        text: '📝 写借条，慢慢还',
        effect: { money: 1000, social: 5, intelligence: 10 },
        dialogue: '亲兄弟明算账！写个借条总行吧？慢慢还！',
      },
      {
        text: '😡 绝交！滚蛋！',
        effect: { money: 2000, social: -30, stress: 20, reputation: -10 },
        dialogue: '我透！你他妈骗子！老子再也不信你了！滚远点！',
      },
      {
        text: '🤝 帮他想办法赚回来',
        effect: { social: 25, stress: 15, intelligence: 8 },
        dialogue: 'ok，都这样了。咱们一起想办法把钱赚回来吧！',
        requirements: { social: 75 }
      },
      {
        text: '😏 "看吧，早说了让你别土块"',
        effect: { social: -5, intelligence: 5, stress: -5 },
        dialogue: '我就说嘛！土块是要有技术的！你这叫盲目土块！',
      }
    ]
  },

  {
    id: 'roommate_lose_money_watch',
    title: '😅 室友真亏了',
    description: '一周后，室友B垂头丧气："我亏光了...还好没借你的钱，不然我真没脸见你了..."',
    dialogue: '我就知道！幸好老子没借给你！',
    choices: [
      {
        text: '😏 "看吧，我说什么来着"',
        effect: { intelligence: 10, social: 5, stress: -10 },
        dialogue: '老子早就看出来了！土块要有技术！你这就是送钱！',
      },
      {
        text: '🤝 安慰他一下',
        effect: { social: 20, stress: 5 },
        dialogue: 'ok，没事儿。交学费而已，以后长记性！',
      },
      {
        text: '💰 借他点钱度日',
        effect: { money: -1000, social: 30, stress: 10 },
        dialogue: '算了，看你这么惨。先借你1000块吧！',
        requirements: { money: 1000 }
      }
    ]
  },

  {
    id: 'roommate_lose_money_partial',
    title: '😭 室友来还钱',
    description: '一周后，室友B苦着脸："我亏了...你的2000块，我只能先还1000..."',
    dialogue: '我就说嘛！幸好只借了2000！',
    choices: [
      {
        text: '😤 必须还完',
        effect: { money: 1000, social: -15, stress: 5 },
        dialogue: '剩下1000赶紧还！写个借条！',
      },
      {
        text: '😔 算了',
        effect: { social: 25, reputation: 10, stress: -5 },
        dialogue: 'ok吧，剩下的就算了。就当请你吃饭了！',
      },
      {
        text: '🤔 慢慢还',
        effect: { money: 500, social: 10, intelligence: 8 },
        dialogue: '写个借条，慢慢还！不急！',
      }
    ]
  },

  {
    id: 'roommate_lose_money_partner',
    title: '😭 合伙投资失败',
    description: '一周后，你和室友一起亏了。他说："兄弟...我们亏了...对不起..."',
    dialogue: '我透...合伙亏钱！这波是猪脑子操作！',
    choices: [
      {
        text: '😤 怪他',
        effect: { social: -20, stress: 15 },
        dialogue: '都怪你推荐的破股票！老子跟你瞎搞！',
      },
      {
        text: '😔 认了',
        effect: { social: 15, stress: -10, intelligence: 10 },
        dialogue: 'ok，愿赌服输。自己选的，怪不了别人！',
      },
      {
        text: '🤝 一起总结经验',
        effect: { social: 20, intelligence: 15, financialKnowledge: 10 },
        dialogue: '算了，交学费了！咱们分析分析哪里错了！',
        requirements: { social: 70 }
      }
    ]
  },

  {
    id: 'professor_research',
    title: '👨‍🏫 教授的研究项目',
    description: '金融学教授在课后找到你："你对量化交易感兴趣吗？我有个研究项目需要助手。"',
    dialogue: '我透！机会来了？教授居然看上老子了！',
    choices: [
      {
        text: '✅ 接受！学习量化',
        effect: { financialKnowledge: 20, intelligence: 15, stress: 20, social: -10 },
        dialogue: '无敌的机会！老子要学真本事了！跟着教授混准没错！',
      },
      {
        text: '💼 拒绝，去实习赚钱',
        effect: { money: 3000, reputation: 5 },
        dialogue: '还是搞钱重要！钱包空了受不了！实习工资香啊！',
      },
      {
        text: '🤝 谈条件：要报酬',
        effect: { money: 1500, financialKnowledge: 15, social: 10 },
        dialogue: '谈生意老子在行！学习搞钱两不误！社牛本色！',
        requirements: { social: 80 }
      },
      {
        text: '🤔 问清楚具体工作内容',
        effect: { intelligence: 5, stress: 5 },
        dialogue: '先搞清楚做什么！不能稀里糊涂答应！',
      },
      {
        text: '📚 同意，但保留实习时间',
        effect: { financialKnowledge: 12, intelligence: 8, stress: 30, money: 1500 },
        dialogue: '全都要！虽然累点但是值！老子扛得住！',
        requirements: { health: 70 }
      },
      {
        text: '😅 "教授，我能力不够吧"',
        effect: { stress: -10, reputation: -5 },
        dialogue: '有点虚啊...万一搞砸了怎么办？还是算了...',
      }
    ]
  },

  {
    id: 'school_beauty_help',
    title: '👩 学姐求助',
    description: '金融社的学姐找你："学弟，我爸的公司要上市，让我了解IPO流程，你能帮我做个报告吗？"',
    dialogue: 'ok，乐子来了！学姐求我帮忙？这波稳赚！',
    choices: [
      {
        text: '📚 认真研究，做完美报告',
        effect: { financialKnowledge: 15, intelligence: 10, social: 20, stress: 25 },
        dialogue: '太强了吧我！这报告做得无敌的！学姐肯定满意！',
      },
      {
        text: '💘 借机约学姐吃饭',
        effect: { social: 25, stress: 15, money: -200 },
        dialogue: '嘿嘿，机会难得！学姐咱们边吃边聊？顺便增进感情！',
        requirements: { social: 85 }
      },
      {
        text: '🤝 提出合作：以后拉我进她爸公司',
        effect: { reputation: 20, social: 15, intelligence: 5 },
        dialogue: '老子有远见！这波是战略投资！提前布局！',
        requirements: { reputation: 30 }
      },
      {
        text: '📖 叫上室友一起做',
        effect: { social: 15, intelligence: 8, financialKnowledge: 10, stress: 15 },
        dialogue: '人多力量大！大家一起搞！效率高还能学到东西！',
      },
      {
        text: '😅 "这个太难了，我怕做不好"',
        effect: { social: -10, stress: -5 },
        dialogue: '我透...IPO流程太复杂了！老子怕搞砸了！',
      },
      {
        text: '💰 "学姐，要不要给点辛苦费？"',
        effect: { money: 500, social: -5, reputation: -3 },
        dialogue: '哈哈哈，开玩笑的！不过真给钱就更好了！',
        requirements: { social: 75 }
      }
    ]
  },

  {
    id: 'internship_offer',
    title: '💼 实习Offer三选一',
    description: '你同时收到三个实习offer：1.券商营业部 2.银行理财部 3.创业公司量化岗',
    dialogue: '我透！都来了？老子魅力这么大？',
    choices: [
      {
        text: '🏢 券商营业部 - 稳定',
        effect: { money: 2000, reputation: 10, financialKnowledge: 10, stress: 10 },
        dialogue: 'ok，稳健发展！大厂还是香啊！平台好背书强！',
      },
      {
        text: '🏦 银行理财部 - 人脉',
        effect: { money: 2500, social: 20, reputation: 15 },
        dialogue: '社牛的主场！认识大佬的好机会！人脉就是财脉！',
      },
      {
        text: '🚀 创业公司 - 学技术',
        effect: { money: 3500, financialKnowledge: 25, intelligence: 20, stress: 30 },
        dialogue: '土块一把！冲创业公司！搏一搏单车变摩托！',
      },
      {
        text: '🤔 都拒绝，继续找更好的',
        effect: { stress: 15, intelligence: 5 },
        dialogue: '老子要价值最大化！再等等说不定有更好的！',
        requirements: { reputation: 40 }
      },
      {
        text: '💰 哪个钱多去哪个',
        effect: { money: 3500, stress: 5 },
        dialogue: '废话少说！谁给钱多老子去哪！实在人！',
      },
      {
        text: '📞 先问问学姐建议',
        effect: { social: 10, intelligence: 8, stress: 5 },
        dialogue: '还是请教一下专业人士！学姐应该有经验！',
        requirements: { social: 70 }
      }
    ]
  },

  {
    id: 'crypto_opportunity',
    title: '₿ 比特币的诱惑',
    description: '一个学长神秘地说："我有内部消息，比特币要暴涨！现在3万一个，梭哈吗？"',
    dialogue: '土块？加密货币？这个老子没玩过啊！',
    choices: [
      {
        text: '🎰 全仓梭哈比特币',
        effect: { money: -4000, riskTolerance: 30, stress: 50 },
        dialogue: '667！土块就完了！比特币冲冲冲！一夜暴富就靠这波了！',
        nextEvent: 'crypto_result'
      },
      {
        text: '💰 买一点试试',
        effect: { money: -1000, riskTolerance: 10, financialKnowledge: 10 },
        dialogue: '小赌怡情！先试试水，不行就跑！稳健土块！',
        nextEvent: 'crypto_result_small' // 小仓位的结果
      },
      {
        text: '🚫 不碰，太邪门',
        effect: { intelligence: 10, stress: -10 },
        dialogue: '老子不当韭菜！这玩意儿太玄学了！看不懂的不碰！',
        nextEvent: 'crypto_result_watch' // 看着学长赚钱
      },
      {
        text: '🤔 先研究一下区块链',
        effect: { intelligence: 15, financialKnowledge: 12, stress: 10 },
        dialogue: '不能盲目跟风！先搞懂原理再说！知己知彼！',
        // 没有后续
      },
      {
        text: '📱 问问懂行的人',
        effect: { social: 10, intelligence: 8, stress: 5 },
        dialogue: '这种事要多听听意见！找个懂的人问问！',
        requirements: { social: 70 }
        // 没有后续
      },
      {
        text: '😏 "你自己买了吗？"',
        effect: { intelligence: 12, stress: -5 },
        dialogue: '先看看你自己信不信！推荐的人往往自己不买！',
        nextEvent: 'crypto_result_watch' // 看着学长赚钱
      }
    ]
  },

  {
    id: 'crypto_result',
    title: '🚀 比特币暴涨50%！',
    description: '一个月后，比特币涨到4.5万！你的投资翻倍了！',
    dialogue: '我无敌的！太强了！老子天选之人啊！',
    choices: [
      {
        text: '💰 立即卖出，落袋为安',
        effect: { money: 6000, intelligence: 15, stress: -30 },
        dialogue: '见好就收！这波血赚，老子财富自由了！知进退才是大佬！',
      },
      {
        text: '💎 继续持有，10万不卖',
        effect: { riskTolerance: 20, stress: 40 },
        dialogue: '还能涨！土块到底！目标10万一个！牛市才刚开始！',
      },
      {
        text: '📢 拉同学一起买',
        effect: { social: 20, reputation: 10, stress: 20 },
        dialogue: '乐子来了！一起发财！老子带你们飞！赚钱大家一起赚！',
      },
      {
        text: '💎 卖一半，留一半',
        effect: { money: 3000, intelligence: 18, stress: -10 },
        dialogue: '保守策略！既能保本又能博收益！老子太聪明了！',
      },
      {
        text: '🚀 加仓！再买5000块',
        effect: { money: -5000, riskTolerance: 30, stress: 35 },
        dialogue: '土块加倍！趁着涨势继续冲！这波要赚大的！',
        requirements: { money: 5000 }
      },
      {
        text: '📱 炫耀一波朋友圈',
        effect: { social: 18, reputation: 12, stress: -20 },
        dialogue: '哈哈哈必须晒一波！让他们看看什么叫投资眼光！',
      }
    ]
  },

  {
    id: 'crypto_result_small',
    title: '🚀 比特币涨了50%',
    description: '一个月后，比特币涨到4.5万！你的1000块变成了1500块！',
    dialogue: 'ok！小赚500！稳健投资还是靠谱的！',
    choices: [
      {
        text: '💰 卖出，落袋为安',
        effect: { money: 1500, intelligence: 12, stress: -15 },
        dialogue: '赚了500！虽然不多但稳！',
      },
      {
        text: '💎 继续持有',
        effect: { riskTolerance: 15, stress: 15 },
        dialogue: '感觉还能涨！先拿着看看！',
      },
      {
        text: '🚀 加仓3000',
        effect: { money: -3000, riskTolerance: 20, stress: 25 },
        dialogue: '既然涨了，那就加仓！',
        requirements: { money: 3000 }
      }
    ]
  },

  {
    id: 'crypto_result_watch',
    title: '😭 学长炫耀赚翻了',
    description: '一个月后，学长在朋友圈晒："比特币涨了50%！哈哈哈发财了！"',
    dialogue: '我透...错过了？！老子怎么没买？！',
    choices: [
      {
        text: '😤 后悔死了',
        effect: { stress: 20, intelligence: -5 },
        dialogue: '我是猪啊！早该买的！错过一个亿！',
      },
      {
        text: '😌 庆幸没买',
        effect: { intelligence: 10, stress: -10 },
        dialogue: 'ok，稳健为主！万一跌了呢？',
      },
      {
        text: '🤔 现在买还来得及吗',
        effect: { stress: 10, intelligence: 5 },
        dialogue: '要不要追高？感觉还能涨啊！',
      },
      {
        text: '😏 "运气好而已"',
        effect: { social: -5, intelligence: 8 },
        dialogue: '哼！运气而已！老子不羡慕！',
      }
    ]
  },

  {
    id: 'final_exam_crisis',
    title: '📝 期末考试危机',
    description: '期末考试周到了，但你最近忙着炒股和社交，完全没复习...',
    dialogue: '我透！要挂科了！',
    choices: [
      {
        text: '📚 临时抱佛脚，通宵学习',
        effect: { intelligence: 10, health: -20, stress: 40 },
        dialogue: '拼了！老子可以的！',
      },
      {
        text: '🤝 找学霸借笔记',
        effect: { social: 10, intelligence: 5, stress: 10 },
        dialogue: 'ok，人脉用上了',
        requirements: { social: 70 }
      },
      {
        text: '😎 佛系考试，随缘',
        effect: { stress: -20, intelligence: -10, reputation: -10 },
        dialogue: '考试而已，乐子就完了',
      }
    ]
  },

  {
    id: 'stock_competition',
    title: '🏆 校园模拟炒股大赛',
    description: '学校举办模拟炒股大赛，奖金1万元！',
    dialogue: '土块的机会来了！',
    choices: [
      {
        text: '🎯 全力以赴拿冠军',
        effect: { financialKnowledge: 20, stress: 30, intelligence: 15 },
        dialogue: '无敌的！冠军是老子的！',
        nextEvent: 'competition_result'
      },
      {
        text: '😎 随便玩玩',
        effect: { financialKnowledge: 10, stress: 5 },
        dialogue: '乐子而已',
        nextEvent: 'competition_result_casual' // 随便玩的结果
      },
      {
        text: '🚫 不参加，浪费时间',
        effect: { stress: -10, intelligence: 5 },
        dialogue: '老子有正事',
        // 没有后续
      }
    ]
  },

  {
    id: 'competition_result',
    title: '🥈 获得第二名',
    description: '经过一个月的激烈角逐,你获得了第二名！奖金5000元。冠军是金融系的学霸...',
    dialogue: '我透！差一点！',
    choices: [
      {
        text: '😤 不服！继续提升',
        effect: { financialKnowledge: 15, intelligence: 10, stress: 20 },
        dialogue: '老子不服！',
      },
      {
        text: '😊 知足了，挺好',
        effect: { money: 5000, stress: -20, health: 10 },
        dialogue: 'ok，赚到了',
      },
      {
        text: '🤝 和冠军交朋友',
        effect: { social: 20, reputation: 15, money: 5000 },
        dialogue: '人脉才是王道！',
        requirements: { social: 80 }
      }
    ]
  },

  {
    id: 'competition_result_casual',
    title: '😅 混了个参与奖',
    description: '比赛结束了，你排名中游，拿了个200块参与奖...',
    dialogue: 'ok，也不错！白嫖200块！',
    choices: [
      {
        text: '😌 满足了',
        effect: { money: 200, stress: -10 },
        dialogue: '反正也没认真玩！有钱拿就行！',
      },
      {
        text: '😤 后悔没认真',
        effect: { money: 200, stress: 10, intelligence: 8 },
        dialogue: '早知道认真点了！看着别人拿大奖真难受！',
      },
      {
        text: '🤔 学到了不少',
        effect: { money: 200, financialKnowledge: 12, intelligence: 10 },
        dialogue: 'ok，经验值拉满！钱不多但学到东西了！',
      }
    ]
  },

  {
    id: 'love_or_money',
    title: '💘 女生表白 vs 实习机会',
    description: '隔壁班的女生向你表白，但同时一个顶级投行的实习机会需要你立即去外地...',
    dialogue: '我透！怎么选？',
    choices: [
      {
        text: '💘 选择爱情',
        effect: { social: 30, health: 20, stress: -20, reputation: -10 },
        dialogue: 'ok，人生不只有钱',
      },
      {
        text: '💼 选择事业',
        effect: { money: 5000, reputation: 25, financialKnowledge: 20, social: -15 },
        dialogue: '事业为重！',
      },
      {
        text: '🎯 两个都要！',
        effect: { stress: 50, health: -20, social: 20, reputation: 15 },
        dialogue: '老子全都要！',
        requirements: { intelligence: 70, social: 85 }
      }
    ]
  },

  {
    id: 'family_emergency',
    title: '🏠 家里急需用钱',
    description: '妈妈打来电话，家里出了急事，需要3万块钱救急...',
    dialogue: '我透...这...',
    choices: [
      {
        text: '💰 全部给家里',
        effect: { money: -30000, stress: 40, health: -10 },
        dialogue: '家人最重要',
      },
      {
        text: '🤝 找朋友借钱',
        effect: { social: 20, stress: 30, money: -10000 },
        dialogue: '兄弟，帮帮忙',
        requirements: { social: 80 }
      },
      {
        text: '📊 抵押股票贷款',
        effect: { stress: 50, intelligence: 10, money: 30000 },
        dialogue: '老子有办法',
        requirements: { financialKnowledge: 60 }
      }
    ]
  }
];

// 导入随机事件
export { randomEvents } from './randomEvents';

// 结局判定系统
export const endings = [
  {
    id: 'wall_street_wolf',
    title: '🐺 华尔街之狼',
    description: '你凭借卓越的金融知识和冒险精神，成功进入顶级投行，年薪百万！',
    requirements: {
      money: { min: 100000 },
      reputation: { min: 80 },
      financialKnowledge: { min: 85 }
    },
    icon: '🏆',
    rank: 'S'
  },

  {
    id: 'quant_master',
    title: '🤖 量化大师',
    description: '你掌握了量化交易的精髓，开发出了赚钱的交易策略！',
    requirements: {
      intelligence: { min: 85 },
      financialKnowledge: { min: 80 },
      money: { min: 50000 }
    },
    icon: '💻',
    rank: 'S'
  },

  {
    id: 'social_king',
    title: '🤝 社交达人',
    description: '你的人脉遍布金融圈，成为了最受欢迎的"金融社牛"！',
    requirements: {
      social: { min: 90 },
      reputation: { min: 70 },
      money: { min: 30000 }
    },
    icon: '👔',
    rank: 'A'
  },

  {
    id: 'gambler_god',
    title: '🎰 土块之神',
    description: '你靠着疯狂的赌性和爆表的运气，从5000元赚到了50万！',
    requirements: {
      money: { min: 500000 },
      riskTolerance: { min: 80 },
      luck: { min: 70 }
    },
    icon: '🎲',
    rank: 'S'
  },

  {
    id: 'corporate_slave',
    title: '🏢 金融民工',
    description: '你进入了一家普通券商，过着996的生活...',
    requirements: {
      money: { min: 20000, max: 50000 },
      reputation: { min: 30, max: 60 }
    },
    icon: '💼',
    rank: 'B'
  },

  {
    id: 'broke_investor',
    title: '📉 韭菜收割机',
    description: '你亏光了所有钱，但学到了宝贵的经验...（钱没了但人还在）',
    requirements: {
      money: { max: 1000 },
      financialKnowledge: { min: 60 }
    },
    icon: '🥬',
    rank: 'C'
  },

  {
    id: 'balanced_life',
    title: '⚖️ 人生赢家',
    description: '你在事业、健康、社交各方面都达到了平衡，这就是幸福！',
    requirements: {
      health: { min: 70 },
      social: { min: 70 },
      money: { min: 40000 },
      stress: { max: 40 }
    },
    icon: '😊',
    rank: 'A'
  },

  {
    id: 'burnout',
    title: '😵 过劳崩溃',
    description: '你太拼了，身体和精神都垮了...',
    requirements: {
      stress: { min: 80 },
      health: { max: 30 }
    },
    icon: '💔',
    rank: 'D'
  },

  {
    id: 'dropout',
    title: '🚫 退学创业',
    description: '你觉得大学学不到东西，退学去创业了！',
    requirements: {
      intelligence: { max: 40 },
      money: { min: 50000 },
      riskTolerance: { min: 70 }
    },
    icon: '🚀',
    rank: 'B'
  },

  {
    id: 'normal_graduate',
    title: '🎓 普通毕业生',
    description: '你顺利毕业了，找到了一份还不错的工作。',
    requirements: {
      // 默认结局，没有特殊要求
    },
    icon: '👨‍🎓',
    rank: 'C'
  }
];

// 成就系统
export const achievements = [
  {
    id: 'first_investment',
    title: '💰 初次投资',
    description: '完成第一次股票买卖',
    icon: '📈'
  },
  {
    id: 'rich_man',
    title: '💎 资产10万',
    description: '资产超过10万元',
    icon: '💰'
  },
  {
    id: 'broke',
    title: '💸 身无分文',
    description: '钱包归零',
    icon: '🥺'
  },
  {
    id: 'social_butterfly',
    title: '🦋 社交蝴蝶',
    description: '社交属性达到95',
    icon: '👥'
  },
  {
    id: 'genius',
    title: '🧠 天才',
    description: '智力属性达到90',
    icon: '💡'
  },
  {
    id: 'gambler',
    title: '🎰 赌徒',
    description: '单次投资超过5万',
    icon: '🎲'
  },
  {
    id: 'lucky_dog',
    title: '🍀 欧皇',
    description: '运气属性达到90',
    icon: '✨'
  },
  {
    id: 'stress_max',
    title: '😰 压力山大',
    description: '压力值达到100',
    icon: '💥'
  },
  {
    id: 'health_crisis',
    title: '🏥 健康警报',
    description: '健康值降到20以下',
    icon: '⚠️'
  },
  {
    id: 'network_king',
    title: '👑 人脉之王',
    description: '拥有10个以上人脉关系',
    icon: '🌐'
  }
];
