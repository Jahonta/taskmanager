function TaskList() {
  return (
    <div className='board__tasks'>
      <article className='card card--black'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>Example task with default color.</p>
            </div>

            <div className='card__settings'>
              <div className='card__details'>
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>23 September</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--blue'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>Example task with custom color.</p>
            </div>

            <div className='card__settings'>
              <div className='card__details'>
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>23 September</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--yellow'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>
                Example task with custom color and without date.
              </p>
            </div>

            <div className='card__settings'>
              <div className='card__details'></div>
            </div>
          </div>
        </div>
      </article>

      <article className='card'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button
                type='button'
                className='card__btn card__btn--favorites card__btn--disabled'
              >
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>
                Example task which marked as favorite.
              </p>
            </div>

            <div className='card__settings'>
              <div className='card__details'>
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>23 September</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--black'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>Example task without date.</p>
            </div>

            <div className='card__settings'>
              <div className='card__details'></div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--pink card--repeat'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>
                It is example of repeating task. It marks by wave.
              </p>
            </div>

            <div className='card__settings'>
              <div className='card__details'>
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>23 September</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--red card--deadline'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>This is task with missing deadline.</p>
            </div>

            <div className='card__settings'>
              <div className='card__details'></div>
            </div>
          </div>
        </div>
      </article>

      <article className='card card--black card--deadline'>
        <div className='card__form'>
          <div className='card__inner'>
            <div className='card__control'>
              <button type='button' className='card__btn card__btn--edit'>
                edit
              </button>
              <button type='button' className='card__btn card__btn--archive'>
                archive
              </button>
              <button type='button' className='card__btn card__btn--favorites'>
                favorites
              </button>
            </div>

            <div className='card__color-bar'>
              <svg className='card__color-bar-wave' width='100%' height='10'>
                <use xlinkHref='#wave'></use>
              </svg>
            </div>

            <div className='card__textarea-wrap'>
              <p className='card__text'>
                This is task with missing deadline. Deadline always marked by
                red line.
              </p>
            </div>

            <div className='card__settings'>
              <div className='card__details'>
                <div className='card__dates'>
                  <div className='card__date-deadline'>
                    <p className='card__input-deadline-wrap'>
                      <span className='card__date'>23 September</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export { TaskList };
