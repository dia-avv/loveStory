import React, { useState, useEffect } from "react";
import "./App.css";

const storyData = [
  {
    id: 1,
    text: "You have a Student Council Gathering in Ploiești, but you don’t want to go alone. You think about who to invite. What do you do?",
    options: [
      { text: "Ask Dia to come with me", nextId: 2 },
      { text: "Go alone and just text her", nextId: 99 },
    ],
  },
  {
    id: 2,
    text: "She agrees to come! The gathering is boring, but having her there makes it better. After it ends, you both feel hungry. What do you do?",
    options: [
      { text: "Take her to KFC", nextId: 3 },
      { text: "Let her decide where to eat", nextId: 4 },
    ],
  },
  {
    id: 3,
    text: "You decide to take her to KFC and, even though you don’t usually do this, you pay for her food. She seems happy. What’s next?",
    options: [
      { text: "Go second-hand shopping together", nextId: 5 },
      { text: "Go catch the train home", nextId: 6 },
    ],
  },
  {
    id: 4,
    text: "She chose to go to KFC. Even though you don't usually do this, you pay for her food. She looks happy. What happens next?",
    options: [
      { text: "Go second-hand shopping together", nextId: 5 },
      { text: "Go catch the train home", nextId: 6 },
    ]
  },
  {
    id: 5,
    text: "You walk into different second-hand stores, holding hands while browsing through clothes. The moment feels special. Time flies, and soon you both need to catch the train home. At the station, it’s cold. What do you do?",
    options: [
      { text: "Hug her to keep warm", nextId: 7 },
      { text: "Joke around and try to keep the mood light", nextId: 8 },
    ],
  },
  {
    id: 6,
    text: "You go to the station, the train is on time, and you both go home, but you feel like something is missing... What if you would have stayed longer?",
    options: [
      { text: "Try again!", nextId: 4 }
    ]
  },
  {
    id: 7,
    text: "You wrap your arms around her, holding her close. ‘Boyfriend, Girlfriend’ by Carwash plays in the earphones. Suddenly, she kisses you… but you freeze. What do you do?",
    options: [
      { text: "Panic and do nothing", nextId: 9 },
      { text: "Kiss her back after a few moments", nextId: 10 },
    ],
  },
  {
    id: 8,
    text: "There’s no hug, no kiss… and she starts to think maybe you don’t like her. But what if you could have done something to show her you actually do?",
    options: [
      { text: "Try again!", nextId: 5 }
    ]
  },
  {
    id: 9,
    text: "You don’t kiss her back immediately, and she seems a little unsure. But after two minutes, you gather your courage and kiss her back, making it official. This is the start of something beautiful.",
    options: [
      { text: "End of THIS story ❤️... but it was only getting started!", nextId: 1 },
    ],
  },
  {
    id: 10,
    text: "You finally kiss her back, making the moment perfect. The train arrives, and as you both step on, you realize this was the day everything changed... for the better.",
    options: [
      { text: "End of THIS story ❤️... but it was only getting started!", nextId: 1 },
    ],
  },
  {
    id: 99,
    text: "You decide to go alone and just text her, but deep down, you feel like something is missing. Maybe things would have turned out differently if you had invited her… (Try again!)",
    options: [
      { text: "Restart Story", nextId: 1 },
    ],
  },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [audio, setAudio] = useState(null);

  const currentStory = storyData.find((section) => section.id === currentSection);

  useEffect(() => {
    if (currentSection === 7 && audio) {
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else if (audio && currentSection !== 7 && currentSection !== 8 && currentSection !== 9) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [currentSection, audio]);

  const handleChoice = (nextId) => {
    if (nextId !== null) {
      setCurrentSection(nextId);
    }
  };

  useEffect(() => {
    const audioFile = new Audio(`${process.env.PUBLIC_URL}/bfgf.mp3`);
    audioFile.preload = "auto"; // Preload the audio file

    audioFile.addEventListener('canplaythrough', () => {
      setAudio(audioFile);
    });

    audioFile.addEventListener('error', (e) => {
      console.error("Error loading audio file:", e);
    });

    return () => {
      audioFile.pause();
      audioFile.currentTime = 0;
      audioFile.removeEventListener('canplaythrough', () => {});
      audioFile.removeEventListener('error', () => {});
    };
  }, []);

  return (
    <div className="app">
      <h1>Our Love Story ❤️</h1>
      <div className="story">
        <p>{currentStory.text}</p>
        <div className="options">
          {currentStory.options.map((option, index) => (
            <button key={index} onClick={() => handleChoice(option.nextId)}>
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
