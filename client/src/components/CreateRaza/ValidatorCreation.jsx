export default function ValidatorCreation(state) {
    const errors = {};

    console.log(state.name.split(''))
    if (!state.name) {
        errors.name = ' Name is required';
    } else if (/^[0-9]+$/g.test(state.name)) {
        errors.name = ' The name must be a string'
    } else if (state.name.length > 50) {
        errors.name = ' The name must have less than 50 letters'
    } else if (!/\S/g.test(state.name)) {
        errors.name = ' Invalid name';
    } else if (state.name[0] !== state.name[0].toUpperCase()) {
        errors.name = ' First letter must be upper case'
    }

    console.log(parseInt(state.weight_min))
    if (!state.weight_min && !state.weight_max) {
        errors.weight_min = ' Weight is required / ';
        errors.weight_max = ' Weight is required / ';
    } else if (parseInt(state.weight_min) < 1) {
        errors.weight_min = ' The weight must be greater than 1 / '
    } else if (parseInt(state.weight_max) > 100) {
        errors.weight_max = ' The weight must be lower than 100 / '
    } else if (parseInt(state.weight_min) > parseInt(state.weight_max)) {
        errors.weight_max = ' Max weight must be greater than min weight / '
    } else if (!/^[0-9]+$/g.test(state.weight_min)) {
        errors.weight_min = ' Invalid min weight / '
    } else if (!/^[0-9]+$/g.test(state.weight_max)) {
        errors.weight_max = ' Invalid max weight / '
    }

    if (!state.height_min && !state.height_max) {
        errors.height_min = ' Height is required / ';
        errors.height_max = ' Height is required / ';
    } else if (parseInt(state.height_min) < 10) {
        errors.height_min = ' The height must be greater than 10 / '
    } else if (parseInt(state.height_max) > 104) {
        errors.height_max = ' The height must be lower than 104 / '
    } else if (parseInt(state.height_min) > parseInt(state.height_max)) {
        errors.height_max = ' Max height must be greater than min height / '
    } else if (!/^[0-9]+$/g.test(state.height_min)) {
        errors.height_min = ' Invalid min height / '
    } else if (!/^[0-9]+$/g.test(state.height_max)) {
        errors.height_max = ' Invalid max height / '
    }

    if (!/^[0-9]+$/g.test(state.lifeSpan)) {
        errors.lifeSpan = ' Invalid life span, must be a number';
    } else if (parseInt(state.lifeSpan) > 30) {
        errors.lifeSpan = ' A breed has never lived so many years'
    }

    return errors;
}