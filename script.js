// WonderWorld – Explore & Learn
// All interactive behaviour lives in this file.

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Mobile navigation
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal elements as they enter the viewport
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Daily discovery facts
  const facts = [
    { category: 'SPACE', emoji: '🪐', text: 'A day on Venus is longer than its year. Venus takes about 243 Earth days to rotate once, but only about 225 Earth days to orbit the Sun!' },
    { category: 'ANIMALS', emoji: '🐙', text: 'An octopus has three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.' },
    { category: 'SCIENCE', emoji: '⚡', text: 'Lightning is hotter than the surface of the Sun. A lightning bolt can heat the air around it to around 30,000°C.' },
    { category: 'NATURE', emoji: '🌳', text: 'Some bamboo species can grow almost a metre in a single day when conditions are right.' },
    { category: 'HUMAN BODY', emoji: '🧠', text: 'Your brain contains billions of nerve cells called neurons that communicate using tiny electrical and chemical signals.' },
    { category: 'TECHNOLOGY', emoji: '💻', text: 'The first computer mouse was made of wood and was invented by Douglas Engelbart in the 1960s.' },
    { category: 'OCEAN', emoji: '🌊', text: 'The ocean covers more than 70% of Earth’s surface, and much of its deep seafloor is still not fully explored.' },
    { category: 'SPACE', emoji: '🌟', text: 'Sunlight takes about 8 minutes and 20 seconds to travel from the Sun to Earth.' },
    { category: 'ANIMALS', emoji: '🦋', text: 'Butterflies taste using sensors on their feet, helping them identify suitable plants.' }
  ];
  let lastFactIndex = 0;
  const factCategory = document.getElementById('factCategory');
  const factEmoji = document.getElementById('factEmoji');
  const factText = document.getElementById('factText');
  document.getElementById('newFactBtn').addEventListener('click', () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * facts.length);
    } while (facts.length > 1 && nextIndex === lastFactIndex);
    lastFactIndex = nextIndex;
    const fact = facts[nextIndex];
    factCategory.textContent = fact.category;
    factEmoji.textContent = fact.emoji;
    factText.textContent = fact.text;
    factText.animate(
      [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 320, easing: 'ease-out' }
    );
  });

  // Quiz question bank
  const quizzes = {
    space: {
      title: 'Space Quiz',
      questions: [
        { q: 'Which planet is known as the Red Planet?', a: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correct: 1, explain: 'Mars looks reddish because its surface contains iron-rich dust.' },
        { q: 'Which star is closest to Earth?', a: ['Sirius', 'Polaris', 'The Sun', 'Vega'], correct: 2, explain: 'The Sun is our closest star and the centre of our solar system.' },
        { q: 'Which planet has the most prominent ring system?', a: ['Saturn', 'Earth', 'Neptune', 'Mars'], correct: 0, explain: 'Saturn is famous for its beautiful rings made mostly of ice and rock.' },
        { q: 'What do we call a rock from space that reaches Earth’s surface?', a: ['Comet', 'Meteorite', 'Asteroid belt', 'Nebula'], correct: 1, explain: 'A space rock that survives its journey through the atmosphere and lands is a meteorite.' },
        { q: 'How many planets are in our solar system?', a: ['Seven', 'Eight', 'Nine', 'Ten'], correct: 1, explain: 'Our solar system has eight recognised planets.' }
      ]
    },
    science: {
      title: 'Science Trivia',
      questions: [
        { q: 'What gas do plants absorb from the air during photosynthesis?', a: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct: 2, explain: 'Plants use carbon dioxide, water and sunlight to make food.' },
        { q: 'What is the centre of an atom called?', a: ['Cell', 'Nucleus', 'Molecule', 'Electron'], correct: 1, explain: 'The nucleus contains protons and neutrons.' },
        { q: 'Which force pulls objects towards Earth?', a: ['Friction', 'Magnetism', 'Gravity', 'Electricity'], correct: 2, explain: 'Gravity attracts objects with mass towards one another.' },
        { q: 'At what temperature does water freeze on the Celsius scale?', a: ['0°C', '10°C', '32°C', '100°C'], correct: 0, explain: 'Pure water freezes at 0°C under standard atmospheric pressure.' },
        { q: 'Which organ pumps blood around the human body?', a: ['Lungs', 'Brain', 'Stomach', 'Heart'], correct: 3, explain: 'The heart is a muscular organ that pumps blood through the circulatory system.' }
      ]
    },
    geography: {
      title: 'Geography Challenge',
      questions: [
        { q: 'Which is the largest ocean on Earth?', a: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'], correct: 2, explain: 'The Pacific Ocean is the largest and deepest ocean on Earth.' },
        { q: 'What is the capital city of Japan?', a: ['Seoul', 'Tokyo', 'Beijing', 'Bangkok'], correct: 1, explain: 'Tokyo is the capital of Japan.' },
        { q: 'Which continent is the Sahara Desert in?', a: ['Asia', 'South America', 'Africa', 'Australia'], correct: 2, explain: 'The Sahara stretches across much of North Africa.' },
        { q: 'Which imaginary line divides Earth into Northern and Southern Hemispheres?', a: ['Prime Meridian', 'Equator', 'Tropic of Cancer', 'International Date Line'], correct: 1, explain: 'The Equator is at 0 degrees latitude.' },
        { q: 'Mount Everest is part of which mountain range?', a: ['Andes', 'Alps', 'Rockies', 'Himalayas'], correct: 3, explain: 'Mount Everest is in the Himalayas, on the Nepal–China border.' }
      ]
    }
  };

  const quizPanel = document.getElementById('quizPanel');
  const quizTitle = document.getElementById('quizTitle');
  const questionCount = document.getElementById('questionCount');
  const scoreCount = document.getElementById('scoreCount');
  const progressFill = document.getElementById('progressFill');
  const questionText = document.getElementById('questionText');
  const answerList = document.getElementById('answerList');
  const answerFeedback = document.getElementById('answerFeedback');
  const nextQuestion = document.getElementById('nextQuestion');
  const questionArea = document.getElementById('questionArea');
  const quizResult = document.getElementById('quizResult');
  const resultText = document.getElementById('resultText');

  let currentQuizKey = null;
  let currentQuestion = 0;
  let score = 0;
  let hasAnswered = false;

  function startQuiz(key) {
    currentQuizKey = key;
    currentQuestion = 0;
    score = 0;
    quizTitle.textContent = quizzes[key].title;
    quizResult.hidden = true;
    questionArea.hidden = false;
    quizPanel.hidden = false;
    renderQuestion();
    quizPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function renderQuestion() {
    const quiz = quizzes[currentQuizKey];
    const item = quiz.questions[currentQuestion];
    hasAnswered = false;
    questionCount.textContent = `Question ${currentQuestion + 1} of ${quiz.questions.length}`;
    scoreCount.textContent = `Score: ${score}`;
    progressFill.style.width = `${(currentQuestion / quiz.questions.length) * 100}%`;
    questionText.textContent = item.q;
    answerFeedback.textContent = '';
    answerList.innerHTML = '';
    nextQuestion.disabled = true;
    nextQuestion.textContent = currentQuestion === quiz.questions.length - 1 ? 'See my results →' : 'Next question →';

    item.a.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-option';
      button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
      button.addEventListener('click', () => chooseAnswer(index));
      answerList.appendChild(button);
    });
  }

  function chooseAnswer(selectedIndex) {
    if (hasAnswered) return;
    hasAnswered = true;
    const item = quizzes[currentQuizKey].questions[currentQuestion];
    const buttons = [...answerList.querySelectorAll('button')];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === item.correct) button.classList.add('correct');
      if (index === selectedIndex && index !== item.correct) button.classList.add('incorrect');
    });

    if (selectedIndex === item.correct) {
      score += 1;
      answerFeedback.textContent = `🎉 Correct! ${item.explain}`;
      answerFeedback.style.color = '#278153';
    } else {
      answerFeedback.textContent = `Good try! ${item.explain}`;
      answerFeedback.style.color = '#8a6270';
    }
    scoreCount.textContent = `Score: ${score}`;
    nextQuestion.disabled = false;
  }

  function showResults() {
    const total = quizzes[currentQuizKey].questions.length;
    questionArea.hidden = true;
    quizResult.hidden = false;
    progressFill.style.width = '100%';
    questionCount.textContent = 'Challenge completed!';
    resultText.textContent = `You scored ${score} out of ${total}. ${score === total ? 'Amazing! You got every answer right!' : score >= 3 ? 'Great work! Keep exploring and learning.' : 'Every explorer learns something new. Give it another try!'}`;
  }

  document.querySelectorAll('.quiz-start').forEach(button => {
    button.addEventListener('click', () => startQuiz(button.dataset.quiz));
  });

  nextQuestion.addEventListener('click', () => {
    if (!hasAnswered) return;
    if (currentQuestion < quizzes[currentQuizKey].questions.length - 1) {
      currentQuestion += 1;
      renderQuestion();
    } else {
      showResults();
    }
  });

  document.getElementById('restartQuiz').addEventListener('click', () => startQuiz(currentQuizKey));
  document.getElementById('closeQuiz').addEventListener('click', () => {
    quizPanel.hidden = true;
    document.getElementById('challenges').scrollIntoView({ behavior: 'smooth' });
  });
});
