import discord from 'assets/images/discord.svg';
import github from 'assets/images/github.svg';
import logo from 'assets/images/logo.svg';

export default function Header(): JSX.Element {
  return (
    <div className='flex h-[120px] items-center justify-between px-4 md:px-16'>
      <img alt='Logo' src={logo} />
      <div className='flex gap-4 shrink-0'>
        <a href='https://discord.com' rel='noreferrer' target='_blank'>
          <img alt='Discord' src={discord} />
        </a>
        <a
          href='https://github.com/SemaphoreNetwork'
          rel='noreferrer'
          target='_blank'
        >
          <img alt='Github' src={github} />
        </a>
      </div>
    </div>
  );
}
