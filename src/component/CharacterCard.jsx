export function CharacterCard(props) {
  return (
    <div id={props.char_id} className='char-card'>
      <img src={`${props.img}`} alt=''></img>
      <div className='description'>
        <p className='char-name'>
          <span className='label'>Name: </span>
          {props.name} <span className='label'>AKA </span>
          {props.nickname}
        </p>
        <p className='char-birthday'>
          <span className='label'>Birthday: </span>
          {props.birthday}
        </p>
        <p className='char-occupation'>
          <span className='label'>Occupation: </span>
          {props.occupation.join(', ')}
        </p>
        <p className='char-status'>
          <span className='label'>Status: </span>
          {props.status}
        </p>
        <p className='char-portrayed-by'>
          <span className='label'>Portrayed By: </span>
          {props.portrayed}
        </p>
      </div>
    </div>
  );
}
