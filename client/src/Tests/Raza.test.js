import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { mount, Adapter, configure } from 'enzyme';

import Raza from "../components/Raza/Raza";

configure({ adapter: new Adapter() });

let container = null;
beforeEach(() => {
    // configurar un elemento del DOM como objetivo del renderizado
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // limpieza al salir
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renderiza datos de raza", async () => {
    const fakeRaza = {
        name: "Test1",
        weight: 5,
        img: "https://estaticos.muyinteresante.es/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-redes.jpg",
        temperament: "Curious"
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeRaza)
        })
    );

    // Usa la versión asíncrona de act para aplicar promesas resueltas
    await act(async () => {
        render(<Raza id="123" />, container);
    });

    const wrapper = mount(<Raza />);
    expect(wrapper.find('div').hasClass('primaryDiv')).to.equal(true);

    // elimina la simulación para asegurar que las pruebas estén completamente aisladas
    global.fetch.mockRestore();
});
