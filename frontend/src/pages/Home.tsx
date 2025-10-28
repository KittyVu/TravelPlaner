import { useState } from 'react';
import TripPLaner from '../components/TripPlaner';
import Chat from '../components/Chat';

export default function Home() {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  return (
    <>
      <p>Welcome to <b>Travel Planner</b>, please choose one of assistants you need to support !</p>
      <ul>
        <li>If you have already own idea, <button onClick={() => setActiveForm(activeForm === 'askform' ? null : 'askform')}>Click here</button></li>
        <li>No idea? <button onClick={() => setActiveForm(activeForm === 'chatform' ? null : 'chatform')}>Chat with me</button></li>
      </ul>
      {activeForm === 'askform' && (
        <TripPLaner />
      )}

      {activeForm === 'chatform' && (
        <Chat />
      )}

    </>
  );
}