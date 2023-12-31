import cn from 'classnames';
import 'animate.css';

import { Button } from '@taskmanager/components';
import { Task } from '@taskmanager/types';
import { isOverdue, isRepeating } from '@taskmanager/helpers';

import { formatCardDate } from '../../helpers/format';

type TaskCardProps = {
  task: Task;
  onEditClick: () => void;
  onUpdate: (task: Task) => void;
  hasError: boolean;
  dropError: () => void;
};

function TaskCard({
  task,
  onEditClick,
  onUpdate,
  hasError,
  dropError,
}: TaskCardProps) {
  const { color, description, dueDate, isArchived, isFavorite, repeatingDays } =
    task;

  return (
    <article
      onAnimationEnd={() => {
        dropError();
      }}
      className={cn(
        'card',
        `card--${color}`,
        {
          'card--deadline': isOverdue(dueDate),
          'card--repeat': isRepeating(repeatingDays),
        },
        'animate__animated',
        {
          animate__shakeX: hasError,
        }
      )}
      data-testid="task-card"
    >
      <div className='card__form'>
        <div className='card__inner'>
          <div className='card__control'>
            <Button
              extraClasses={['card__btn', 'card__btn--edit']}
              onClick={onEditClick}
            >
              edit
            </Button>
            <Button
              extraClasses={cn('card__btn', 'card__btn--archive', {
                'card__btn--disabled': isArchived,
              }).split(' ')}
              onClick={() => {
                onUpdate({ ...task, isArchived: !isArchived });
              }}
            >
              archive
            </Button>
            <Button
              extraClasses={cn('card__btn', 'card__btn--favorites', {
                'card__btn--disabled': isFavorite,
              }).split(' ')}
              onClick={() => {
                onUpdate({ ...task, isFavorite: !isFavorite });
              }}
            >
              favorites
            </Button>
          </div>

          <div className='card__color-bar'>
            <svg className='card__color-bar-wave' width='100%' height='10'>
              <use xlinkHref='#wave'></use>
            </svg>
          </div>

          <div className='card__textarea-wrap'>
            <p className='card__text'>{description}</p>
          </div>

          <div className='card__settings'>
            <div className='card__details'>
              {dueDate && (
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>
                        {formatCardDate(dueDate)}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export { TaskCard };
