// =====================================================================
// TYPE DESCRIPTIONS
//
// typeWelcome:         shown at the top of every result, above the type's sections.
// typeDescriptions:    one entry per type. Each section has a `heading` and `items`;
//                      each item is one bullet point. `name` is optional (for example
//                      "The Principled Reformer"); leave it as '' to show just "Type 6".
// reflectionQuestions: shown at the end of every result.
// =====================================================================

const typeWelcome = "Hey there! Looks like you decided to take the leap, discover your type, and dive deeper into your own story. I’m so glad you’re here! Now that you know your type, we’re going to start exploring your specific journey through the Decode Theory. But first, let’s get to know you a little! Are you Ready?";

const reflectionQuestions = [
  "When you listened to this introduction, what stood out to you the most?",
  "Did anything in this introduction give language to something you've experienced but haven't quite known how to describe?",
  "Where do you see these patterns in your life the most?",
  "What does it feel like to hear yourself described this way? Can you approach what you're noticing with curiosity, even if some of it feels uncomfortable?"
];

const typeDescriptions = {
  1: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 1, you may find yourself noticing things other people overlook.",
          "What could be improved.",
          "What doesn't quite make sense.",
          "What's out of place or could be done better.",
          "You naturally see the gap between how things are and how they could be.",
          "And once you see it, it's hard to simply ignore it."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "You care about doing what is right.",
          "Integrity matters to you. So does responsibility, fairness, and following through on what you say you'll do.",
          "You want your actions to line up with your convictions.",
          "You don't want to cut corners or simply do something because it's easier.",
          "You want to be someone others can count on.",
          "And when something matters to you, you want to give it the attention and effort it deserves."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can bring order to chaos, clarity to confusion, and structure to things that feel disorganized.",
          "You often recognize what needs attention and can see practical ways to make things better.",
          "You take your responsibilities seriously, and you care about the quality of what you put into the world.",
          "There's something meaningful about knowing you've done your part and done it well.",
          "You don't just see what is. You see what it could become."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But living with that kind of awareness can be tiring.",
          "You might finish a project and immediately notice what you could have done better.",
          "You might replay a conversation, wondering if you handled it the right way.",
          "Even when things are going well, there's often something else you could improve.",
          "And sometimes, you hold yourself to standards that you would never expect someone else to meet.",
          "You may be so accustomed to looking for what needs to change that it's difficult to simply enjoy what is already good."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your desire to do what is right isn't something you need to get rid of.",
          "Your convictions matter. Your commitment matters. Your desire to make things better matters.",
          "But sometimes, the very qualities that help you do things well can make it difficult to feel at ease.",
          "The desire to improve can leave you feeling like you've never quite done enough.",
          "The desire to do things right can make mistakes feel heavier than they need to be.",
          "And the ability to recognize what needs fixing can make it difficult to extend that same patience and understanding to yourself."
        ]
      },
      {
        heading: "An Invitation to Understand What’s Happening",
        items: [
          "As we begin, I don't want you to listen to this course looking for everything that's wrong with you, or bad in you.",
          "I want you to approach it with curiosity.",
          "Because some of the things you've spent years judging about yourself may begin to make sense when you understand what's happening underneath them.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: you don't have to fix yourself before we begin.",
          "Let's start by understanding what's happening."
        ]
      }
    ]
  },
  2: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 2, you may find yourself paying attention to the people around you.",
          "You notice when someone's having a hard day.",
          "You pick up on what people might need.",
          "You remember the little things that make someone feel seen.",
          "While other people may be focused on what's happening, you often find yourself thinking about who is experiencing what’s happening.",
          "You don't just see people. You notice them."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Relationships matter to you.",
          "You care about connection, closeness, and making the people in your life feel loved.",
          "You want the people around you to know they matter.",
          "You may find deep meaning in being there when someone needs you, celebrating their successes, or helping carry the weight of a difficult season.",
          "You want to make a difference in people's lives through the love you give to them and others.",
          "And when someone you care about is hurting, it's hard for you to simply stand by and do nothing."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You may be the person who checks in, remembers the details, offers encouragement, or finds a way to help without being asked.",
          "You know how to make people feel welcomed and cared for.",
          "You can often sense when someone needs a little extra attention or reassurance.",
          "You bring warmth into relationships, and you have a way of making people feel like they're not facing life alone.",
          "Sometimes, the smallest things you do can mean more to someone than you realize.",
          "You have a way of making people feel that they matter."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But caring so much about people can also be tiring.",
          "You may find yourself thinking about what someone else needs before you've even considered what you need.",
          "You might rearrange your plans to help someone, remember what everyone else has going on, or find yourself emotionally invested in things that other people don't even realize you're carrying.",
          "Sometimes, you can be surrounded by people you love and still wonder whether they understand you as deeply as you understand them.",
          "You may be so attentive to everyone else's needs that it takes a while to recognize your own.",
          "And even when you're tired, you may still find yourself asking, \"What else can I do for them?\""
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your capacity to care isn't something you need to get rid of.",
          "Your compassion matters. Your generosity matters. Your desire to show up for people matters.",
          "But sometimes, caring for others can become so natural that you forget to make room for yourself.",
          "You may find it easier to offer help than to ask for it.",
          "You may know how to make other people feel loved while struggling to explain what would help you feel loved.",
          "And sometimes, you may wish someone would notice what you need without you having to be the one to bring it up."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear any of this and conclude that caring too much is what's wrong with you.",
          "Your love for people is meaningful, and the world needs people who care the way you do.",
          "But you deserve the same attention, compassion, and care that you so freely offer others.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: This is not a course to show you how to become better for everyone else.",
          "For a little while, let's turn that same curiosity toward you."
        ]
      }
    ]
  },
  3: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 3, you may naturally see opportunities where other people see obstacles.",
          "You notice what needs to happen, what could be accomplished, and how to move things forward.",
          "When there's a goal in front of you, you often start thinking about how to make it happen.",
          "You may find yourself asking:",
          "“What's the best way to approach this?”",
          "“How can we make this work?”",
          "“What's the next step?”",
          "You don't just see what's possible. You start figuring out how to get there."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "You care about making a difference.",
          "You want your time, energy, and abilities to count for something.",
          "Accomplishment can be meaningful to you, not simply because of the recognition it brings, but because you want to know that you're contributing, growing, and making progress.",
          "You may value competence, excellence, and the ability to follow through on what you set out to do.",
          "You want to be someone who can be counted on to get things done.",
          "And when you commit to something that matters, you can bring an incredible amount of energy and determination to it."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can often adapt quickly to changing circumstances.",
          "You recognize what a situation needs and find ways to respond.",
          "You know how to organize your efforts, build momentum, and keep moving when things get difficult.",
          "You may be the person who helps a team find direction, turns an idea into reality, or brings energy to a project that has stalled.",
          "You have a gift for seeing what could be accomplished and helping make it happen.",
          "You don't just dream about what could be. You find ways to bring it to life."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But always moving toward something can make it difficult to slow down.",
          "You may finish one goal and find yourself thinking about the next before you've had time to enjoy what you've accomplished.",
          "You might move through a busy day getting everything done, only to realize you haven't stopped to ask yourself how you're actually doing.",
          "When someone asks how you feel, you may find it easier to talk about what happened or what needs to happen next.",
          "And sometimes, even when things are going well, you can feel a quiet pressure to keep going.",
          "There is always something else to accomplish, another opportunity to pursue, or another way to improve."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your drive isn't something you need to get rid of.",
          "Your ambition matters. Your determination matters. Your desire to contribute and accomplish meaningful things matters.",
          "But sometimes, the pace you maintain can make it difficult to recognize what is happening inside you.",
          "You may become so focused on what you're doing that you lose touch with how you're feeling.",
          "You may be so accustomed to moving forward that slowing down feels unfamiliar.",
          "And sometimes, you may know exactly what you're working toward without having much space to consider what you actually want or need."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that ambition is the problem or that you need to stop pursuing meaningful things.",
          "Your ability to work hard, adapt, and make things happen is valuable.",
          "But you are more than what you accomplish.",
          "You are worth understanding beyond your productivity, your achievements, and the things other people see you do.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't have to accomplish anything in this moment.",
          "You can slow down, take a breath, and begin to understand the person behind everything you do."
        ]
      }
    ]
  },
  4: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 4, you may notice things that other people don't always stop to consider.",
          "You pick up on the feeling behind a moment, the meaning behind a conversation, or the beauty in something others might overlook.",
          "You may find yourself drawn to experiences that feel genuine, personal, or deeply meaningful.",
          "You're often interested in what lies beneath the surface.",
          "You don't just want to know what something is. You want to understand what it means."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Authenticity matters to you.",
          "You want your life to reflect who you really are, not simply what other people expect you to be.",
          "You care about meaning, emotional honesty, and having relationships where you can be known beyond the surface.",
          "You may be drawn to art, music, stories, or experiences that give expression to things that are difficult to put into words.",
          "You want to be able to bring your whole self into the world, including the parts that are complicated, sensitive, or difficult to explain.",
          "You want what is real, not just what looks good on the surface."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You may have a natural ability to recognize and express emotions that other people struggle to articulate.",
          "You can bring depth to conversations, creativity to ideas, and meaning to ordinary experiences.",
          "You may notice subtle shifts in the emotional atmosphere of a room or understand why a particular moment matters to someone.",
          "You can help people slow down and pay attention to parts of life they might otherwise overlook.",
          "Your sensitivity can help you recognize beauty, hold space for difficult emotions, and see the humanity in experiences that aren't easy to explain.",
          "You have a way of reminding people that life is not just about getting through the day. There is something worth experiencing within it."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But experiencing life so deeply can also be complicated.",
          "You may have feelings that are difficult to explain, even to people who know you well.",
          "Sometimes, you can be surrounded by people and still feel like they don't quite understand what is happening inside you.",
          "You may spend time reflecting on a conversation, a relationship, or an experience because you want to understand what it meant to you.",
          "And you may find yourself comparing your life or your experience with what you see in other people, wondering why something seems to come more naturally to them.",
          "You want to feel understood, but finding the right words for your inner world isn't always easy."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your depth isn't something you need to get rid of.",
          "Your sensitivity matters. Your creativity matters. Your desire for authenticity and meaning matters.",
          "But sometimes, the search for meaning can make it difficult to simply be present with the life you're already living.",
          "You may become so focused on understanding what you're feeling that it's hard to move through the feeling itself.",
          "You may look at someone else's life and become more aware of what seems to be missing from your own.",
          "And sometimes, the desire to be deeply understood can leave you feeling even more alone when other people don't seem to see what you wish they could."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that feeling deeply is the problem.",
          "Your emotional depth, creativity, and desire for a meaningful life are worth appreciating.",
          "You don't have to become less sensitive or less yourself to understand yourself.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't have to make sense of every feeling or figure out every part of yourself before we begin.",
          "Let's start by making room for the person you already are."
        ]
      }
    ]
  },
  5: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 5, you may find yourself wanting to understand how things work.",
          "When something interests you, you want to look closer, ask questions, and get beyond the surface-level explanation.",
          "You may be the person who wants to research something before forming an opinion or understand the bigger picture before jumping in.",
          "You don't need to be the loudest person in the room. You may prefer to listen, observe, and think before you speak.",
          "You want to understand what you're looking at before deciding what you think about it."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Understanding matters to you.",
          "You value knowledge, competence, independence, and the freedom to think for yourself.",
          "You want to know what you're talking about rather than simply repeat what someone else has said.",
          "You may care deeply about having time to explore your interests, develop your ideas, and follow a question wherever it leads.",
          "You appreciate conversations that have substance and people who are willing to think carefully about a subject.",
          "And you may value having room to make sense of things in your own way, without feeling pressured to respond before you're ready."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can spend time with a question that other people are ready to move past.",
          "You may notice connections, patterns, and details that others overlook.",
          "You can bring a thoughtful perspective to complicated problems because you're willing to slow down and examine them carefully.",
          "When something captures your interest, you can develop a depth of understanding that becomes genuinely useful to the people around you.",
          "You don't need to know everything, but when you want to understand something, you want to understand it well.",
          "You have a way of bringing depth and clarity to things that might otherwise remain unexplored."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But spending so much time thinking can sometimes make it difficult to know when you have enough information to move forward.",
          "You may want to understand a situation before getting involved, or think through your response before sharing it with someone else.",
          "You might need time alone after a busy day of conversations, decisions, or demands.",
          "Sometimes, other people may expect more of your time or energy than you feel ready to give.",
          "And you may find yourself holding back until you feel confident that you understand enough to contribute.",
          "You want to engage with the world, but you also want the space to do so thoughtfully and on your own terms."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your curiosity isn't something you need to get rid of.",
          "Your thoughtfulness matters. Your independence matters. Your desire to understand things deeply matters.",
          "But sometimes, the desire to feel prepared can make it difficult to step into an experience before you understand it completely.",
          "You may spend more time gathering information than putting what you know into practice.",
          "You may find it easier to think through a difficult situation privately than to work through it with another person.",
          "And sometimes, protecting your time and energy can leave you more disconnected from people or experiences you genuinely care about."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that you need to become more outgoing, more spontaneous, or less thoughtful.",
          "Your ability to observe, learn, and think deeply is valuable.",
          "You don't have to abandon your need for space or stop asking questions to understand yourself more fully.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't need to have everything figured out before we begin.",
          "You can bring your questions, take your time, and begin to discover what is happening underneath the way you move through the world."
        ]
      }
    ]
  },
  6: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 6, you may naturally find yourself thinking a few steps ahead.",
          "You consider what could happen, what might go wrong, and what you may need to be prepared for.",
          "You might notice a detail that others have overlooked or ask a question nobody else thought to ask.",
          "When faced with a decision, you may want to look at it from several angles before deciding how to move forward.",
          "You don't just want to know what is happening right now. You want to understand what it could mean for what happens next."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Trust matters to you.",
          "You care about loyalty, dependability, and knowing that the people in your life will show up when it counts.",
          "You want relationships where people mean what they say and follow through on their commitments.",
          "You may take your responsibilities seriously because you understand that other people are counting on you, too.",
          "You value people who are honest with you, even when the truth is difficult, and you want to be someone others can depend on in return.",
          "You want to know that when it matters most, you and the people you love can count on one another."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can anticipate problems before they become obvious.",
          "You think through possibilities, ask thoughtful questions, and help people prepare for what might be ahead.",
          "You may be the person who remembers the backup plan, notices what hasn't been considered, or makes sure the important details are taken care of.",
          "When people you care about are going through something difficult, you want to stand beside them.",
          "Your loyalty can run deep, and once someone has earned your trust, you may be incredibly committed to that relationship.",
          "You bring a kind of thoughtfulness and preparedness that can help people feel supported when life gets uncertain."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But thinking ahead can sometimes make it difficult to be fully present.",
          "You may find yourself considering what could go wrong even when things seem to be going well.",
          "You might revisit a decision, wondering whether you've overlooked something or whether there's a better option.",
          "Sometimes, you want reassurance, but even after someone offers it, you may still have questions.",
          "You may want to trust a person or move forward with a decision while also feeling the need to examine it a little more.",
          "And it can be exhausting when your mind keeps working through possibilities long after you've done everything you reasonably can."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your thoughtfulness isn't something you need to get rid of.",
          "Your loyalty matters. Your questions matter. Your desire to be prepared and dependable matters.",
          "But sometimes, considering every possibility can make it difficult to feel settled with the information you have.",
          "You may spend so much time looking for certainty that making a decision becomes harder than it needs to be.",
          "You may find yourself questioning things you genuinely want to trust.",
          "And sometimes, even when you have good reasons to feel confident, it can be difficult to let yourself rest in that confidence."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that you need to stop asking questions, stop thinking ahead, or trust everyone without discernment.",
          "Your ability to think carefully, recognize risks, and remain loyal to the people you love is valuable.",
          "You don't have to ignore your concerns to understand yourself more fully.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't need to have every question answered before we begin.",
          "Let's start by understanding what happens inside you when life doesn't give you all the certainty you'd like to have."
        ]
      }
    ]
  },
  7: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 7, you may naturally find yourself looking at what could be.",
          "You see possibilities, opportunities, and experiences worth exploring.",
          "When one idea leads to another, your mind may already be imagining where it could go.",
          "You might find yourself planning a trip while you're still on one, thinking about your next project before the current one is finished, or getting excited about an idea simply because of what it could become.",
          "You don't just see what life is. You see what life could be."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Freedom matters to you.",
          "You want room to explore, grow, experience new things, and make the most of the opportunities in front of you.",
          "You value variety, possibility, and the ability to choose your own path.",
          "You love learning about new subjects, meeting new people, traveling to unfamiliar places, or imagining what the future could hold.",
          "You want life to feel engaging and full of possibility.",
          "And when something genuinely excites you, you can bring an incredible amount of enthusiasm and energy to it."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can bring energy into a room and help people see possibilities they hadn't considered.",
          "You may be quick to generate ideas, connect seemingly unrelated things, or find an unexpected way forward when a plan falls apart.",
          "You often have a knack for turning an ordinary moment into something enjoyable.",
          "Your curiosity can lead you to explore things other people might never think to try.",
          "You can help people look beyond what's immediately in front of them and imagine something better.",
          "You have a way of reminding people how much possibility still exists."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But when you see so many possibilities, it can be difficult to settle into just one.",
          "You may get excited about an idea, make plans, and then discover something else that sounds just as appealing.",
          "Sometimes, even when life is good, you can feel that there is still something else you want to experience.",
          "You may have so much you want to do that slowing down and being present with what you're doing can take more effort than you'd expect.",
          "And it can be frustrating to feel limited by time, circumstances, or the reality that you simply can't do everything."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your enthusiasm isn't something you need to get rid of.",
          "Your curiosity matters. Your imagination matters. Your desire to experience life fully matters.",
          "But sometimes, the search for what's next can make it difficult to appreciate what's already here.",
          "You may move quickly toward a new opportunity before giving yourself time to finish or fully enjoy the current one.",
          "You may find it easier to imagine a better experience than to stay present when an experience becomes difficult, disappointing, or uncomfortable.",
          "And sometimes, having so many options can make it hard to choose one and trust that the life you're living right now is worth being present for."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that you need to become less enthusiastic, stop exploring, or settle for a life that doesn't excite you.",
          "Your joy, curiosity, and ability to see possibilities are valuable.",
          "You don't have to lose your sense of adventure to understand yourself more fully.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't have to rush toward the next thing to begin.",
          "Let's slow down just enough to understand what's happening within you, right here, right now."
        ]
      }
    ]
  },
  8: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 8, you may naturally find yourself looking at what needs to be done and figuring out how to make it happen.",
          "You tend to meet things head-on rather than wait around hoping they'll work themselves out.",
          "You may notice when something isn't fair, when someone is being taken advantage of, or when a situation needs someone willing to step up.",
          "When there's a problem, you often want to address it directly.",
          "You don't tend to stand on the sidelines when something matters to you."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Honesty matters to you.",
          "So does strength, loyalty, and having the freedom to make your own decisions.",
          "You respect people who say what they mean, stand by their convictions, and take responsibility for their actions.",
          "You may have a strong protective instinct toward the people you love.",
          "When someone is being mistreated, you may find it difficult to sit back and do nothing.",
          "You want to know that the people and things you care about are being treated fairly, and you're often willing to stand up and do something about it."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can bring confidence and direction to situations where other people feel uncertain.",
          "You're often willing to have the difficult conversation, make the hard decision, or take responsibility when something needs to happen.",
          "You may be comfortable challenging the status quo when you believe something needs to change.",
          "People may look to you when they need someone who won't back down from a difficult situation.",
          "And when you care about someone, your loyalty can show up in powerful, practical ways.",
          "You have a way of helping people feel that someone is willing to stand up for them."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But moving through life with that kind of strength and intensity can have its own challenges.",
          "You may see a problem and want to address it immediately, while other people need more time to process it.",
          "You might become frustrated when people avoid a conversation that you believe needs to happen.",
          "Sometimes, you may feel like you're the one who has to step up, take charge, or make sure things get done.",
          "And when something matters deeply to you, it can be difficult to sit back and let someone else handle it differently than you would.",
          "You may be so accustomed to being the strong one that other people don't always recognize when something is weighing on you, too."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your strength isn't something you need to get rid of.",
          "Your courage matters. Your honesty matters. Your willingness to protect people and stand up for what is right matters.",
          "But sometimes, the instinct to take charge can make it difficult to leave room for other people to step in.",
          "You may find yourself carrying more responsibility than you intended because it's hard to trust that something important will be handled well without your involvement.",
          "You may be comfortable confronting a problem but less comfortable admitting when something has hurt you.",
          "And sometimes, the strength that helps you face difficult situations can make it harder to let other people see the parts of you that need care, too."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that you need to become less strong, less direct, or less willing to stand up for what matters.",
          "Your courage, conviction, and protectiveness are valuable.",
          "You don't have to give up your strength to understand yourself more fully.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't have to solve everything or take charge of everything in this moment.",
          "Let's begin by understanding what is happening beneath the strength everyone else sees."
        ]
      }
    ]
  },
  9: {
    name: '',
    sections: [
      {
        heading: "How You See the World",
        items: [
          "If you're a Type 9, you may naturally find yourself considering different perspectives.",
          "You can often understand where someone else is coming from, even when you don't necessarily agree with them.",
          "You may notice the tension in a room or sense when something feels unsettled between people.",
          "You tend to appreciate a sense of ease, where people can be themselves and things don't have to become a battle.",
          "You may find yourself looking for common ground or wondering how everyone can move forward together.",
          "You don't just see different sides of a situation. You can often understand how they fit together."
        ]
      },
      {
        heading: "What Matters to You",
        items: [
          "Peace matters to you.",
          "So does connection, stability, and the ability to feel comfortable being yourself around other people.",
          "You value relationships where people can get along without constantly having to defend themselves or prove a point.",
          "You may care deeply about creating an environment where people feel welcome, included, and accepted.",
          "You don't need to be the center of attention to enjoy being part of something meaningful.",
          "Sometimes, simply being together, sharing an ordinary moment, or knowing things are okay can mean a great deal to you."
        ]
      },
      {
        heading: "What Comes Naturally to You",
        items: [
          "You can help people feel comfortable and accepted.",
          "You may be a calming presence when emotions are running high or a steady voice when everyone else feels overwhelmed.",
          "You often have the patience to listen, the ability to see multiple sides, and a willingness to work toward a solution that considers everyone involved.",
          "You may help people feel heard without making them feel judged.",
          "And because you can appreciate different perspectives, you can bring people together who might otherwise struggle to understand one another.",
          "You have a way of helping people feel that there is room for everyone."
        ]
      },
      {
        heading: "What It Feels Like to Be You",
        items: [
          "But when you're accustomed to making room for everyone else, it can sometimes be difficult to know how much room you're making for yourself.",
          "You may find yourself agreeing to a plan because it sounds fine, even when you have another preference.",
          "You might put off a difficult conversation because you don't want a disagreement to become something bigger than it needs to be.",
          "Sometimes, when someone asks what you want, you genuinely may not have an immediate answer.",
          "Or you may know what you want but find yourself weighing it against what everyone else wants, until your own preference seems less important.",
          "And while you may help other people feel understood, you may sometimes wish they would take the time to understand you, too."
        ]
      },
      {
        heading: "The Tension You May Recognize",
        items: [
          "I want you to know that your desire for peace isn't something you need to get rid of.",
          "Your patience matters. Your openness matters. Your ability to make room for other people matters.",
          "But sometimes, keeping things peaceful can come at the expense of expressing what is happening inside you.",
          "You may become so accustomed to going along with things that you lose touch with what you genuinely want.",
          "You may tell yourself something isn't worth bringing up, even when it matters to you.",
          "And sometimes, you can be so focused on maintaining connection that you don't realize how much of yourself you've set aside in the process."
        ]
      },
      {
        heading: "An Invitation to Understand Yourself",
        items: [
          "As we begin, I don't want you to hear this and conclude that you need to become more forceful, more confrontational, or less considerate of others.",
          "Your steadiness, patience, and ability to bring people together are valuable.",
          "You don't have to stop making room for others to begin making room for yourself.",
          "We're going to explore the stories you've learned to believe, the patterns you've developed, and what Jesus wants you to discover about yourself.",
          "And just a quick statement for you specifically: You don't have to know all the answers or figure everything out before we begin. You don't even have to know exactly what you want or how you feel right now.",
          "For a little while, let's just make room for you and your journey, too."
        ]
      }
    ]
  }
};
