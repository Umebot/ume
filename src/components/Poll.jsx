import { useState } from 'react';
import 'breezu';

import '../main.css';
import questions from '../survey.json';
import compilation from '../compilation.json';
import { useIsMobile } from './useIsMobile';

const fixCount = 3; // FIXME: get max length

const findLink = (compilation, survey, isMobile) => {
  const surveyStr = Object.values(survey).join('');

  for (const key of Object.keys(compilation)) {
    if (key.length < surveyStr.length) continue;

    let isMatch = true;
    for (let i = 0; i < surveyStr.length; i++) {
      if (key[i] !== '0' && key[i] !== surveyStr[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      const device = isMobile ? 'mobile' : 'desktop';
      const compilationLink = compilation[key][device];
      const compilationLinkParts = compilationLink.split('/');

      const pathname = window.location.pathname
        .split('/')
        .filter((substr) => Boolean(substr));

      if (compilationLinkParts[0] === pathname[pathname.length - 1]) {
        return compilationLinkParts[1];
      } else {
        return compilationLink;
      }
    }
  }

  return null;
};

const Header = ({ fact, exp, setPopUp }) => (
  <>
    <div className={`loader ${fact === exp ? 'final' : ''}`}>
      {fact ? (
        <div style={{ width: `${Math.min((fact * 100) / exp, 100)}%` }}>
          {fact} / {exp}
        </div>
      ) : (
        <center>{!fact ? `${fact} / ${exp}` : ``}</center>
      )}
    </div>
    <i
      className='close fa-solid fa-circle-xmark'
      onClick={() => {
        window.dataLayer.push({
          event: 'survey_event',
          eventCategory: 'Survey',
          eventAction: 'ButtonClick',
          eventLabel: 'close survey',
        });
        setPopUp(false);
      }}
    />
  </>
);

const Footer = ({ clearSurvey, backSurvey }) => (
  <>
    <p className='stretch' />
    <div className='inline'>
      <button
        className='secondary-buttosn'
        onClick={() => {
          window.dataLayer.push({
            event: 'survey_event',
            eventCategory: 'Survey',
            eventAction: 'ButtonClick',
            eventLabel: 'back button',
          });
          backSurvey();
        }}
      >
        <i className='fa-solid fa-arrow-left' />
        Назад
      </button>
      <button
        className='secondary-button'
        onClick={() => {
          window.dataLayer.push({
            event: 'survey_event',
            eventCategory: 'Survey',
            eventAction: 'ButtonClick',
            eventLabel: 'repeat button',
          });
          clearSurvey();
        }}
      >
        <i className='fa-solid fa-rotate-left' />
        Начать заново
      </button>
    </div>
  </>
);

const Poll = ({
  step,
  survey,
  clearSurvey,
  setSurvey,
  backSurvey,
  setQuestion,
  setPopUp,
  isMobile,
}) => {
  // Redux incompatibility
  if (step === undefined) {
    setQuestion('1');
    clearSurvey();
    window.location.reload();
  }

  if (step === null) {
    return (
      <>
        <Header fact={fixCount} exp={fixCount} setPopUp={setPopUp} />

        <center>
          <i className='fa-solid fa-circle-check final' />
          <br />
          Спасибо за ваши ответы!
          <br />
          Мы собрали товары, которые идеально вам подойдут
        </center>

        <a
          href={findLink(compilation, survey, isMobile)}
          onClick={() =>
            window.dataLayer.push({
              event: 'survey_event',
              eventCategory: 'Survey',
              eventAction: 'ButtonClick',
              eventLabel: 'watch compilation',
            })
          }
        >
          <button className='main-button'>Смотреть подборку</button>
        </a>

        <Footer clearSurvey={clearSurvey} backSurvey={backSurvey} />
      </>
    );
  }

  // Redux incompatibility
  if (questions[step] === undefined) {
    setQuestion('1');
    clearSurvey();
    window.location.reload();
  }

  const count = Object.keys(survey).length;

  return (
    <>
      <Header fact={count} exp={fixCount} setPopUp={setPopUp} />

      <div className='poll'>
        <p>{questions[step].question}</p>
        {questions[step].answers.map((answer, idx) => (
          <div onClick={() => setSurvey(step, idx)} key={idx}>
            {answer.answer}
          </div>
        ))}
      </div>

      {step !== '1' ? (
        <Footer clearSurvey={clearSurvey} backSurvey={backSurvey} />
      ) : (
        <></>
      )}
    </>
  );
};

const PopUp = ({ setPopUp, PopUpContainer, containerProps }) => (
  <div className='popup'>
    <div className='popup_cover' onClick={() => setPopUp(false)} />
    <div className='popup_body'>
      <PopUpContainer {...containerProps} />
    </div>
  </div>
);

const Container = () => {
  const [survey, surveySet] = useState({});
  const [question, setQuestion] = useState('1');
  const [popup, setPopUp] = useState(false);

  const { isMobile } = useIsMobile();

  const surveyClear = () => {
    surveySet({});
  };
  const surveyBack = () => {
    const {
      [String(Math.max(...Object.keys(survey).map(Number)))]: _,
      ...newState
    } = survey;
    surveySet(newState);
  };

  const setSurvey = (step, idx) => {
    surveySet({ ...survey, [step]: idx + 1 });
    setQuestion(questions[step].answers[idx].next);
    setPopUp(true);

    // Event: Option Selected
    window.dataLayer.push({
      event: 'survey_event',
      eventCategory: 'Survey',
      eventAction: 'Option Selected',
      eventLabel: `step ${step} – option ${idx + 1}`,
    });

    // Event: Survey Completed
    if (questions[step].answers[idx].next === null) {
      window.dataLayer.push({
        event: 'survey_event',
        eventCategory: 'Survey',
        eventAction: 'Survey Completed',
      });
    }
  };

  const clearSurvey = () => {
    setQuestion('1');
    surveyClear();
  };

  const backSurvey = () => {
    const previous = Object.keys(survey).length
      ? String(Math.max(...Object.keys(survey).map(Number)))
      : '1';
    setQuestion(previous);
    surveyBack();
    setPopUp(true);
  };

  const containerProps = {
    step: question,
    survey,
    clearSurvey,
    setSurvey,
    backSurvey,
    setQuestion,
    setPopUp,
    isMobile,
  };

  return (
    <>
      <div className='open'>
        <button
          type='button'
          className='start-button'
          onClick={() => setPopUp(true)}
        >
          Нажмите, чтобы подобрать аппарат
        </button>
      </div>
      {popup ? (
        <PopUp
          setPopUp={setPopUp}
          PopUpContainer={Poll}
          containerProps={containerProps}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Container;
