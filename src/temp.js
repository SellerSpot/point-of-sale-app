// used to close the slider on keydown
const asdfasdfe = () => {
    if (confirmSliderClose?.show) {
        dispatch(
            openConfirmDialog({
                title: confirmSliderClose.title ?? 'Go back to previous page?',
                description:
                    confirmSliderClose?.message ??
                    'This action can cause loss of data in the current form',
                failureActionLabel: confirmSliderClose.failureActionLabel ?? 'Go to previous page',
                successActionLabel: confirmSliderClose.successActionLabel ?? 'Stay on current page',
                actionOrder: 'reverse',
                onFailure: () => {
                    dispatch(toggleSliderModal({ sliderName: props.sliderName, active: false }));
                },
                onSuccess: () => {
                    dispatch(closeConfirmDialog());
                },
            }),
        );
    } else {
        dispatch(toggleSliderModal({ sliderName: props.sliderName, active: false }));
    }
};
