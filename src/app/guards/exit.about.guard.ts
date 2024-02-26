import {AboutComponent} from "../about/about.component";

export const exitAboutGuard = (component: AboutComponent) => {
    if (!component.saved) {
        return window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
    }

    return true;
}