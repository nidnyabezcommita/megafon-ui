import * as React from 'react';
import {
    AccessibilityEventType,
    checkEventIsClickOrEnterPress,
    cnCreate,
    detectTouch,
    filterDataAttrs,
} from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './Switcher.less';

export interface ISwitcherProps {
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
    };
    /** Дополнительный класс корневого элемента */
    className?: string;
    /** Управление состоянием вкл/выкл компонента */
    checked?: boolean;
    /** Отключение переключателя */
    disabled?: boolean;
    /** Cостояние загрузки */
    loaded?: boolean;
    /** Размер текста лейбла */
    textSize?: 'small' | 'medium';
    /** Позиция лейбла относительно свитчера */
    textPosition?: 'left' | 'right';
    /** Обработчик изменения элемента */
    onChange?: (e: AccessibilityEventType) => void;
}

const cn = cnCreate('mfui-switcher');
const Switcher: React.FC<ISwitcherProps> = ({
    dataAttrs,
    className,
    checked = false,
    disabled = false,
    loaded,
    children,
    textSize = 'medium',
    textPosition = 'right',
    onChange,
}) => {
    const isTouch: boolean = detectTouch();
    const isLeftContent = !!children && textPosition === 'left';
    const isRightContent = !!children && textPosition === 'right';
    const showLoader = loaded && !disabled;
    const isInteractiveDisabled = loaded || disabled;

    const handleChange = React.useCallback(
        (e: AccessibilityEventType): void => {
            if (isInteractiveDisabled || !checkEventIsClickOrEnterPress(e)) {
                return;
            }

            onChange?.(e);
        },
        [isInteractiveDisabled, onChange],
    );

    return (
        <div className={cn({ disabled })}>
            {isLeftContent && <div className={cn('content', { size: textSize, left: true })}>{children}</div>}
            <div
                {...filterDataAttrs(dataAttrs?.root)}
                className={cn(
                    'input',
                    {
                        checked,
                        disabled,
                        'no-touch': !isTouch,
                    },
                    className,
                )}
                onClick={handleChange}
                onKeyDown={handleChange}
                tabIndex={isInteractiveDisabled ? undefined : 0}
            >
                {showLoader && <div className={cn('loader')} />}
                <div className={cn('pointer')} />
            </div>
            {isRightContent && <div className={cn('content', { size: textSize })}>{children}</div>}
        </div>
    );
};

Switcher.propTypes = {
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    className: PropTypes.string,
    textSize: PropTypes.oneOf(['small', 'medium']),
    textPosition: PropTypes.oneOf(['left', 'right']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    loaded: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Switcher;
