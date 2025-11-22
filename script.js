// Web Designer - Sistema di gestione elementi

let elements = [];
let selectedElement = null;
let elementIdCounter = 0;
let gridCellTexts = {}; // Per salvare i testi delle celle griglia
let draggedElement = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Elementi disponibili con le loro proprietà
const elementTypes = {
    h1: {
        name: 'Titolo H1',
        tag: 'h1',
        defaultContent: 'Titolo H1',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H1' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '32', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '15', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '10', unit: 'px' }
        }
    },
    h2: {
        name: 'Titolo H2',
        tag: 'h2',
        defaultContent: 'Titolo H2',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H2' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '28', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '12', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '8', unit: 'px' }
        }
    },
    h3: {
        name: 'Titolo H3',
        tag: 'h3',
        defaultContent: 'Titolo H3',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H3' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '24', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '6', unit: 'px' }
        }
    },
    h4: {
        name: 'Titolo H4',
        tag: 'h4',
        defaultContent: 'Titolo H4',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H4' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '20', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '8', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '5', unit: 'px' }
        }
    },
    h5: {
        name: 'Titolo H5',
        tag: 'h5',
        defaultContent: 'Titolo H5',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H5' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '18', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '6', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '4', unit: 'px' }
        }
    },
    h6: {
        name: 'Titolo H6',
        tag: 'h6',
        defaultContent: 'Titolo H6',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Titolo H6' },
            color: { label: 'Colore', type: 'color', value: '#333333' },
            fontSize: { label: 'Font Size', type: 'number', value: '16', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', 'bold', '300', '400', '600', '700', '800'], value: 'bold' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right'], value: 'left' },
            margin: { label: 'Margin', type: 'number', value: '4', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '3', unit: 'px' }
        }
    },
    paragraph: {
        name: 'Paragrafo',
        tag: 'p',
        defaultContent: 'Scrivi il tuo testo qui...',
        properties: {
            text: { label: 'Testo', type: 'textarea', value: 'Scrivi il tuo testo qui...' },
            color: { label: 'Colore', type: 'color', value: '#666666' },
            fontSize: { label: 'Font Size', type: 'number', value: '16', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', '300', '400', '500', '600', '700'], value: 'normal' },
            textAlign: { label: 'Allineamento', type: 'select', options: ['left', 'center', 'right', 'justify'], value: 'left' },
            lineHeight: { label: 'Line Height', type: 'number', value: '1.6', unit: '' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '5', unit: 'px' }
        }
    },
    button: {
        name: 'Bottone',
        tag: 'button',
        defaultContent: 'Clicca qui',
        properties: {
            text: { label: 'Testo', type: 'text', value: 'Clicca qui' },
            bgColor: { label: 'Colore Sfondo', type: 'color', value: '#667eea' },
            textColor: { label: 'Colore Testo', type: 'color', value: '#ffffff' },
            fontSize: { label: 'Font Size', type: 'number', value: '14', unit: 'px' },
            fontWeight: { label: 'Peso Font', type: 'select', options: ['normal', '500', '600', '700'], value: '600' },
            padding: { label: 'Padding', type: 'number', value: '12', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            borderRadius: { label: 'Arrotondamento', type: 'number', value: '6', unit: 'px' }
        }
    },
    box: {
        name: 'Box',
        tag: 'div',
        defaultContent: 'Box contenitore',
        properties: {
            text: { label: 'Contenuto', type: 'text', value: 'Box contenitore' },
            bgColor: { label: 'Colore Sfondo', type: 'color', value: '#f0f4ff' },
            borderColor: { label: 'Colore Bordo', type: 'color', value: '#667eea' },
            borderWidth: { label: 'Spessore Bordo', type: 'number', value: '2', unit: 'px' },
            padding: { label: 'Padding', type: 'number', value: '15', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            borderRadius: { label: 'Arrotondamento', type: 'number', value: '6', unit: 'px' }
        }
    },
    image: {
        name: 'Immagine',
        tag: 'img',
        defaultContent: '',
        properties: {
            src: { label: 'URL Immagine', type: 'text', value: 'https://via.placeholder.com/200' },
            alt: { label: 'Descrizione', type: 'text', value: 'Immagine' },
            width: { label: 'Larghezza', type: 'number', value: '200', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            borderRadius: { label: 'Arrotondamento', type: 'number', value: '6', unit: 'px' }
        }
    },
    grid: {
        name: 'Griglia',
        tag: 'div',
        defaultContent: '',
        properties: {
            columns: { label: 'Colonne', type: 'number', value: '2', unit: '' },
            rows: { label: 'Righe', type: 'number', value: '2', unit: '' },
            gap: { label: 'Spazio', type: 'number', value: '12', unit: 'px' },
            bgColor: { label: 'Colore Sfondo', type: 'color', value: '#f9f9f9' },
            borderColor: { label: 'Colore Bordo', type: 'color', value: '#667eea' },
            padding: { label: 'Padding', type: 'number', value: '15', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' }
        }
    },
    form: {
        name: 'Form Login',
        tag: 'form',
        defaultContent: '',
        properties: {
            formType: { label: 'Tipo Form', type: 'select', options: ['login', 'registrazione'], value: 'login' },
            bgColor: { label: 'Colore Sfondo', type: 'color', value: '#ffffff' },
            borderColor: { label: 'Colore Bordo', type: 'color', value: '#ddd' },
            inputBgColor: { label: 'Colore Input', type: 'color', value: '#f9f9f9' },
            inputBorderColor: { label: 'Colore Bordo Input', type: 'color', value: '#ddd' },
            buttonColor: { label: 'Colore Bottone', type: 'color', value: '#667eea' },
            buttonTextColor: { label: 'Colore Testo Bottone', type: 'color', value: '#ffffff' },
            padding: { label: 'Padding', type: 'number', value: '30', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '10', unit: 'px' },
            borderRadius: { label: 'Arrotondamento', type: 'number', value: '8', unit: 'px' }
        }
    },
    navbar: {
        name: 'Navbar',
        tag: 'nav',
        defaultContent: '',
        properties: {
            bgColor: { label: 'Colore Sfondo', type: 'color', value: '#667eea' },
            textColor: { label: 'Colore Testo', type: 'color', value: '#ffffff' },
            links: { label: 'Link', type: 'text', value: 'Home,About,Services,Contact' },
            padding: { label: 'Padding', type: 'number', value: '15', unit: 'px' },
            margin: { label: 'Margin', type: 'number', value: '0', unit: 'px' }
        }
    }
};

// Impostazioni globali del sito
let globalSettings = {
    containerWidth: 1000,
    containerPadding: 20,
    bodyBgColor: '#f5f5f5',
    primaryColor: '#667eea',
    textColor: '#333333',
    designerBgColor: '#f8f9fa'
};

// Elementi sulla pagina
const designer = document.getElementById('designer');
const codeOutputHtml = document.getElementById('code-output-html');
const codeOutputCss = document.getElementById('code-output-css');
const codeOutputJs = document.getElementById('code-output-js');
const propertiesDiv = document.getElementById('properties');
const addButtons = document.querySelectorAll('.add-btn');
const clearBtn = document.getElementById('clear-btn');
const codeTabBtns = document.querySelectorAll('.code-tab-btn');
const copyAllBtn = document.getElementById('copy-all-btn');
const copyHtmlBtn = document.getElementById('copy-html-btn');
const copyCssBtn = document.getElementById('copy-css-btn');
const copyJsBtn = document.getElementById('copy-js-btn');

// Event Listeners
addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        addElement(type);
    });
});

clearBtn.addEventListener('click', () => {
    if (confirm('Sei sicuro di voler cancellare tutto?')) {
        elements = [];
        selectedElement = null;
        renderDesigner();
        renderCode();
        renderProperties();
    }
});

copyAllBtn.addEventListener('click', () => {
    const html = codeOutputHtml.textContent;
    const css = codeOutputCss.textContent;
    const js = codeOutputJs.textContent;
    const combined = html + '\n\n' + css + '\n\n' + js;
    navigator.clipboard.writeText(combined).then(() => {
        const originalText = copyAllBtn.textContent;
        copyAllBtn.textContent = '✓ Copiato!';
        setTimeout(() => {
            copyAllBtn.textContent = originalText;
        }, 2000);
    });
});

copyHtmlBtn.addEventListener('click', () => {
    const code = codeOutputHtml.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyHtmlBtn.textContent;
        copyHtmlBtn.textContent = '✓ Copiato!';
        setTimeout(() => {
            copyHtmlBtn.textContent = originalText;
        }, 2000);
    });
});

copyCssBtn.addEventListener('click', () => {
    const code = codeOutputCss.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyCssBtn.textContent;
        copyCssBtn.textContent = '✓ Copiato!';
        setTimeout(() => {
            copyCssBtn.textContent = originalText;
        }, 2000);
    });
});

copyJsBtn.addEventListener('click', () => {
    const code = codeOutputJs.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyJsBtn.textContent;
        copyJsBtn.textContent = '✓ Copiato!';
        setTimeout(() => {
            copyJsBtn.textContent = originalText;
        }, 2000);
    });
});

codeTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        codeTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.code-output').forEach(output => {
            output.classList.remove('active');
        });

        if (tab === 'html') {
            codeOutputHtml.classList.add('active');
        } else if (tab === 'css') {
            codeOutputCss.classList.add('active');
        } else if (tab === 'js') {
            codeOutputJs.classList.add('active');
        }
    });
});

// Event listeners per le impostazioni globali
document.querySelectorAll('.global-setting').forEach(input => {
    input.addEventListener('change', () => {
        globalSettings.designerBgColor = document.getElementById('global-designer-bg').value;
        globalSettings.containerWidth = parseInt(document.getElementById('global-container-width').value) || 1000;
        globalSettings.containerPadding = parseInt(document.getElementById('global-container-padding').value) || 20;
        globalSettings.bodyBgColor = document.getElementById('global-body-bg').value;
        globalSettings.primaryColor = document.getElementById('global-primary-color').value;
        globalSettings.textColor = document.getElementById('global-text-color').value;

        // Aggiorna il colore della preview
        designer.style.backgroundColor = globalSettings.designerBgColor;

        renderCode();
    });
});

// Aggiungi elemento
function addElement(type) {
    const elementType = elementTypes[type];
    if (!elementType) return;

    const element = {
        id: elementIdCounter++,
        type: type,
        properties: JSON.parse(JSON.stringify(elementType.properties))
    };

    elements.push(element);
    selectElement(element.id);
    renderDesigner();
    renderCode();
}

// Seleziona elemento
function selectElement(elementId) {
    selectedElement = elementId;
    renderDesigner();
    renderProperties();
}

// Elimina elemento
function deleteElement(elementId) {
    elements = elements.filter(el => el.id !== elementId);
    if (selectedElement === elementId) {
        selectedElement = null;
    }
    renderDesigner();
    renderCode();
    renderProperties();
}

// Aggiorna proprietà elemento
function updateElementProperty(elementId, propName, value) {
    const element = elements.find(el => el.id === elementId);
    if (element && element.properties[propName]) {
        element.properties[propName].value = value;
        renderDesigner();
        renderCode();
    }
}

// Renderizza il designer
function renderDesigner() {
    // Rimuovi placeholder se ci sono elementi
    const placeholder = designer.querySelector('.placeholder');
    if (placeholder && elements.length > 0) {
        placeholder.remove();
    } else if (!placeholder && elements.length === 0) {
        designer.innerHTML = '<p class="placeholder">Inizia aggiungendo elementi dal pannello a sinistra</p>';
        return;
    }

    designer.innerHTML = elements.map(element => {
        const html = createElementHTML(element);
        const isSelected = selectedElement === element.id;
        const top = element.position?.top || Math.random() * 50;
        const left = element.position?.left || Math.random() * 50;
        return `
            <div class="designer-element ${isSelected ? 'selected' : ''}" data-id="${element.id}" style="top: ${top}px; left: ${left}px;">
                ${html}
                <button class="element-delete-btn" title="Elimina">✕</button>
            </div>
        `;
    }).join('');

    // Event listeners per i click sugli elementi
    document.querySelectorAll('.designer-element').forEach(el => {
        el.addEventListener('click', (e) => {
            if (!e.target.classList.contains('element-delete-btn')) {
                selectElement(parseInt(el.dataset.id));
            }
        });

        el.addEventListener('mousedown', (e) => {
            if (!e.target.classList.contains('element-delete-btn')) {
                draggedElement = el;
                const rect = el.getBoundingClientRect();
                const canvasRect = designer.getBoundingClientRect();
                dragOffsetX = e.clientX - rect.left;
                dragOffsetY = e.clientY - rect.top;
                el.style.zIndex = '1000';
                el.style.cursor = 'grabbing';
            }
        });

        el.querySelector('.element-delete-btn').addEventListener('click', () => {
            deleteElement(parseInt(el.dataset.id));
        });
    });

    // Mouse move per il drag
    document.addEventListener('mousemove', (e) => {
        if (draggedElement) {
            const canvasRect = designer.getBoundingClientRect();
            let newX = e.clientX - canvasRect.left - dragOffsetX;
            let newY = e.clientY - canvasRect.top - dragOffsetY;

            // Limita il movimento entro il canvas
            newX = Math.max(0, Math.min(newX, canvasRect.width - draggedElement.offsetWidth));
            newY = Math.max(0, Math.min(newY, canvasRect.height - draggedElement.offsetHeight));

            draggedElement.style.top = newY + 'px';
            draggedElement.style.left = newX + 'px';
        }
    });

    // Mouse up per terminare il drag
    document.addEventListener('mouseup', () => {
        if (draggedElement) {
            draggedElement.style.zIndex = 'auto';
            draggedElement.style.cursor = 'grab';

            const elementId = parseInt(draggedElement.dataset.id);
            const element = elements.find(el => el.id === elementId);
            if (element) {
                element.position = {
                    top: parseInt(draggedElement.style.top),
                    left: parseInt(draggedElement.style.left)
                };
            }

            draggedElement = null;
        }
    });
}// Crea HTML dell'elemento
function createElementHTML(element) {
    const props = element.properties;
    const type = element.type;

    switch (type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'paragraph':
            const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type);
            const tag = isHeading ? type : 'p';
            const style = `
                color: ${props.color.value};
                font-size: ${props.fontSize.value}px;
                font-weight: ${props.fontWeight.value};
                text-align: ${props.textAlign.value};
                margin: ${props.margin.value}px;
                padding: ${props.padding.value}px;
                ${props.lineHeight ? `line-height: ${props.lineHeight.value};` : ''}
            `;
            return `<${tag} style="${style}">${props.text.value}</${tag}>`;

        case 'button':
            return `
                <button style="
                    background-color: ${props.bgColor.value};
                    color: ${props.textColor.value};
                    font-size: ${props.fontSize.value}px;
                    font-weight: ${props.fontWeight.value};
                    padding: ${props.padding.value}px 20px;
                    margin: ${props.margin.value}px;
                    border-radius: ${props.borderRadius.value}px;
                    border: none;
                    cursor: pointer;
                ">
                    ${props.text.value}
                </button>
            `;

        case 'box':
            return `
                <div style="
                    background-color: ${props.bgColor.value};
                    border: ${props.borderWidth.value}px solid ${props.borderColor.value};
                    padding: ${props.padding.value}px;
                    margin: ${props.margin.value}px;
                    border-radius: ${props.borderRadius.value}px;
                ">
                    ${props.text.value}
                </div>
            `;

        case 'image':
            return `<img src="${props.src.value}" alt="${props.alt.value}" style="width: ${props.width.value}px; margin: ${props.margin.value}px; border-radius: ${props.borderRadius.value}px; max-width: 100%;">`;

        case 'grid':
            const cols = parseInt(props.columns.value);
            const rows = parseInt(props.rows.value);
            let gridContent = '';
            for (let i = 0; i < cols * rows; i++) {
                const cellKey = `${element.id}-cell-${i}`;
                const cellText = gridCellTexts[cellKey] || `Cella ${i + 1}`;
                gridContent += `<div class="grid-cell" data-cell-id="${cellKey}" style="cursor: pointer; padding: 15px; background: white; border: 1px solid #ddd; border-radius: 4px; text-align: center; min-height: 60px; display: flex; align-items: center; justify-content: center;" onclick="editGridCell(this)">${cellText}</div>`;
            }
            return `
                <div style="
                    display: grid;
                    grid-template-columns: repeat(${cols}, 1fr);
                    gap: ${props.gap.value}px;
                    padding: ${props.padding.value}px;
                    margin: ${props.margin.value}px;
                    background-color: ${props.bgColor.value};
                    border: 2px solid ${props.borderColor.value};
                    border-radius: 6px;
                ">
                    ${gridContent}
                </div>
            `;

        case 'form':
            const isLogin = props.formType.value === 'login';
            let formContent = '';

            if (isLogin) {
                formContent = `
                    <h3 style="color: #333; margin-bottom: 20px; font-weight: bold; font-size: 24px;">Accedi</h3>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Email</label>
                        <input type="email" placeholder="nome@email.com" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Password</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <button type="submit" style="width: 100%; padding: 12px; background-color: ${props.buttonColor.value}; color: ${props.buttonTextColor.value}; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 16px;">Accedi</button>
                    <p style="text-align: center; margin-top: 15px; color: #666;">Non hai un account? <a href="#" style="color: ${props.buttonColor.value}; text-decoration: none;">Registrati</a></p>
                `;
            } else {
                formContent = `
                    <h3 style="color: #333; margin-bottom: 20px; font-weight: bold; font-size: 24px;">Registrati</h3>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Nome Completo</label>
                        <input type="text" placeholder="Mario Rossi" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Email</label>
                        <input type="email" placeholder="nome@email.com" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Password</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 600;">Conferma Password</label>
                        <input type="password" placeholder="••••••••" style="width: 100%; padding: 12px; border: 1px solid ${props.inputBorderColor.value}; background-color: ${props.inputBgColor.value}; border-radius: 6px; font-size: 14px; font-family: inherit; box-sizing: border-box;">
                    </div>
                    <button type="submit" style="width: 100%; padding: 12px; background-color: ${props.buttonColor.value}; color: ${props.buttonTextColor.value}; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 16px;">Registrati</button>
                    <p style="text-align: center; margin-top: 15px; color: #666;">Hai già un account? <a href="#" style="color: ${props.buttonColor.value}; text-decoration: none;">Accedi</a></p>
                `;
            }

            return `
                <form style="
                    background-color: ${props.bgColor.value};
                    border: 1px solid ${props.borderColor.value};
                    padding: ${props.padding.value}px;
                    margin: ${props.margin.value}px;
                    border-radius: ${props.borderRadius.value}px;
                    max-width: 400px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                ">
                    ${formContent}
                </form>
            `;

        case 'navbar':
            const links = props.links.value.split(',').map(link => `<a href="#" style="color: ${props.textColor.value}; text-decoration: none; margin: 0 15px; font-weight: 600;">${link.trim()}</a>`).join('');
            return `
                <nav style="
                    background-color: ${props.bgColor.value};
                    padding: ${props.padding.value}px;
                    margin: ${props.margin.value}px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                ">
                    <span style="color: ${props.textColor.value}; font-weight: bold; font-size: 18px;">Logo</span>
                    <div style="display: flex; gap: 10px;">
                        ${links}
                    </div>
                </nav>
            `;

        default:
            return '';
    }
}

// Renderizza le proprietà
function renderProperties() {
    if (selectedElement === null) {
        propertiesDiv.innerHTML = '<p class="info-text">Seleziona un elemento per modificarlo</p>';
        return;
    }

    const element = elements.find(el => el.id === selectedElement);
    if (!element) return;

    const elementType = elementTypes[element.type];
    const props = element.properties;

    let html = `<h4 style="margin-bottom: 12px; color: #667eea;">${elementType.name}</h4>`;

    for (const [propName, propData] of Object.entries(props)) {
        const value = propData.value;
        const unit = propData.unit || '';

        if (propData.type === 'text') {
            html += `
                <div class="property-input">
                    <label>${propData.label}:</label>
                    <input type="text" value="${value}" data-prop="${propName}" class="prop-input">
                </div>
            `;
        } else if (propData.type === 'textarea') {
            html += `
                <div class="property-input" style="grid-template-columns: 1fr;">
                    <label>${propData.label}:</label>
                    <textarea data-prop="${propName}" class="prop-input" style="grid-column: 1/-1; min-height: 80px;">${value}</textarea>
                </div>
            `;
        } else if (propData.type === 'color') {
            html += `
                <div class="property-input">
                    <label>${propData.label}:</label>
                    <input type="color" value="${value}" data-prop="${propName}" class="prop-input">
                </div>
            `;
        } else if (propData.type === 'number') {
            html += `
                <div class="property-input">
                    <label>${propData.label}:</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="number" value="${value}" data-prop="${propName}" class="prop-input" style="flex: 1;">
                        <span style="width: 30px; display: flex; align-items: center;">${unit}</span>
                    </div>
                </div>
            `;
        } else if (propData.type === 'select') {
            html += `
                <div class="property-input">
                    <label>${propData.label}:</label>
                    <select data-prop="${propName}" class="prop-input">
                        ${propData.options.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                </div>
            `;
        }
    }

    propertiesDiv.innerHTML = html;

    // Event listeners per le proprietà
    propertiesDiv.querySelectorAll('.prop-input').forEach(input => {
        input.addEventListener('change', () => {
            updateElementProperty(selectedElement, input.dataset.prop, input.value);
        });

        input.addEventListener('input', () => {
            updateElementProperty(selectedElement, input.dataset.prop, input.value);
        });
    });
}

// Renderizza il codice
function renderCode() {
    let htmlCode = '<!DOCTYPE html>\n';
    htmlCode += '<html lang="it">\n';
    htmlCode += '<head>\n';
    htmlCode += '    <meta charset="UTF-8">\n';
    htmlCode += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    htmlCode += '    <title>Pagina Web</title>\n';
    htmlCode += '    <link rel="stylesheet" href="style.css">\n';
    htmlCode += '</head>\n';
    htmlCode += '<body>\n';
    htmlCode += '    <div class="container">\n';

    elements.forEach(element => {
        const code = generateElementCode(element);
        const lines = code.trim().split('\n');
        lines.forEach(line => {
            htmlCode += '        ' + line + '\n';
        });
    });

    htmlCode += '    </div>\n';
    htmlCode += '</body>\n';
    htmlCode += '</html>';

    // Genera CSS
    let cssCode = '/* STILI GENERALI */\n';
    cssCode += '* {\n';
    cssCode += '    margin: 0;\n';
    cssCode += '    padding: 0;\n';
    cssCode += '    box-sizing: border-box;\n';
    cssCode += '}\n\n';
    cssCode += 'body {\n';
    cssCode += `    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n`;
    cssCode += `    background: ${globalSettings.bodyBgColor};\n`;
    cssCode += `    color: ${globalSettings.textColor};\n`;
    cssCode += '    padding: 20px;\n';
    cssCode += '}\n\n';
    cssCode += '.container {\n';
    cssCode += `    max-width: ${globalSettings.containerWidth}px;\n`;
    cssCode += `    padding: ${globalSettings.containerPadding}px;\n`;
    cssCode += '    margin: 0 auto;\n';
    cssCode += '}\n\n';

    cssCode += '/* STILI TITOLI */\n';
    cssCode += 'h1, h2, h3, h4, h5, h6 {\n';
    cssCode += '    line-height: 1.3;\n';
    cssCode += '}\n\n';

    cssCode += '/* STILI ELEMENTI */\n';

    elements.forEach((element) => {
        const props = element.properties;
        let styles = '';

        switch (element.type) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                styles = `.element-${element.id} {\n`;
                styles += `    color: ${props.color.value};\n`;
                styles += `    font-size: ${props.fontSize.value}px;\n`;
                styles += `    font-weight: ${props.fontWeight.value};\n`;
                styles += `    text-align: ${props.textAlign.value};\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `}\n\n`;
                break;

            case 'paragraph':
                styles = `.element-${element.id} {\n`;
                styles += `    color: ${props.color.value};\n`;
                styles += `    font-size: ${props.fontSize.value}px;\n`;
                styles += `    font-weight: ${props.fontWeight.value};\n`;
                styles += `    text-align: ${props.textAlign.value};\n`;
                styles += `    line-height: ${props.lineHeight.value};\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `}\n\n`;
                break;

            case 'button':
                styles = `.element-${element.id} {\n`;
                styles += `    background-color: ${props.bgColor.value};\n`;
                styles += `    color: ${props.textColor.value};\n`;
                styles += `    font-size: ${props.fontSize.value}px;\n`;
                styles += `    font-weight: ${props.fontWeight.value};\n`;
                styles += `    padding: ${props.padding.value}px 20px;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    border-radius: ${props.borderRadius.value}px;\n`;
                styles += `    border: none;\n`;
                styles += `    cursor: pointer;\n`;
                styles += `    transition: transform 0.2s, box-shadow 0.2s;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id}:hover {\n`;
                styles += `    transform: scale(1.05);\n`;
                styles += `    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n`;
                styles += `}\n\n`;
                break;

            case 'box':
                styles = `.element-${element.id} {\n`;
                styles += `    background-color: ${props.bgColor.value};\n`;
                styles += `    border: ${props.borderWidth.value}px solid ${props.borderColor.value};\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    border-radius: ${props.borderRadius.value}px;\n`;
                styles += `}\n\n`;
                break;

            case 'image':
                styles = `.element-${element.id} {\n`;
                styles += `    width: ${props.width.value}px;\n`;
                styles += `    height: auto;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    border-radius: ${props.borderRadius.value}px;\n`;
                styles += `    max-width: 100%;\n`;
                styles += `}\n\n`;
                break;

            case 'grid':
                styles = `.element-${element.id} {\n`;
                styles += `    display: grid;\n`;
                styles += `    grid-template-columns: repeat(${props.columns.value}, 1fr);\n`;
                styles += `    gap: ${props.gap.value}px;\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    background-color: ${props.bgColor.value};\n`;
                styles += `    border: 2px solid ${props.borderColor.value};\n`;
                styles += `    border-radius: 6px;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} .grid-cell {\n`;
                styles += `    background: white;\n`;
                styles += `    padding: 20px;\n`;
                styles += `    border: 1px solid #ddd;\n`;
                styles += `    border-radius: 4px;\n`;
                styles += `    text-align: center;\n`;
                styles += `    color: #666;\n`;
                styles += `    min-height: 60px;\n`;
                styles += `    display: flex;\n`;
                styles += `    align-items: center;\n`;
                styles += `    justify-content: center;\n`;
                styles += `}\n\n`;
                break;

            case 'form':
                styles = `.element-${element.id} {\n`;
                styles += `    background-color: ${props.bgColor.value};\n`;
                styles += `    border: 1px solid ${props.borderColor.value};\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    border-radius: ${props.borderRadius.value}px;\n`;
                styles += `    max-width: 400px;\n`;
                styles += `    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} h3 {\n`;
                styles += `    color: #333;\n`;
                styles += `    margin-bottom: 20px;\n`;
                styles += `    font-weight: bold;\n`;
                styles += `    font-size: 24px;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} .form-group {\n`;
                styles += `    margin-bottom: 15px;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} label {\n`;
                styles += `    display: block;\n`;
                styles += `    margin-bottom: 5px;\n`;
                styles += `    color: #333;\n`;
                styles += `    font-weight: 600;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} input {\n`;
                styles += `    width: 100%;\n`;
                styles += `    padding: 12px;\n`;
                styles += `    border: 1px solid ${props.inputBorderColor.value};\n`;
                styles += `    background-color: ${props.inputBgColor.value};\n`;
                styles += `    border-radius: 6px;\n`;
                styles += `    font-size: 14px;\n`;
                styles += `    font-family: inherit;\n`;
                styles += `    box-sizing: border-box;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} button {\n`;
                styles += `    width: 100%;\n`;
                styles += `    padding: 12px;\n`;
                styles += `    background-color: ${props.buttonColor.value};\n`;
                styles += `    color: ${props.buttonTextColor.value};\n`;
                styles += `    border: none;\n`;
                styles += `    border-radius: 6px;\n`;
                styles += `    font-weight: 600;\n`;
                styles += `    cursor: pointer;\n`;
                styles += `    font-size: 16px;\n`;
                styles += `    transition: background-color 0.3s;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} button:hover {\n`;
                styles += `    opacity: 0.9;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} p {\n`;
                styles += `    text-align: center;\n`;
                styles += `    margin-top: 15px;\n`;
                styles += `    color: #666;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} a {\n`;
                styles += `    color: ${props.buttonColor.value};\n`;
                styles += `    text-decoration: none;\n`;
                styles += `}\n\n`;
                break;

            case 'navbar':
                styles = `.element-${element.id} {\n`;
                styles += `    background-color: ${props.bgColor.value};\n`;
                styles += `    padding: ${props.padding.value}px;\n`;
                styles += `    margin: ${props.margin.value}px;\n`;
                styles += `    display: flex;\n`;
                styles += `    align-items: center;\n`;
                styles += `    gap: 20px;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} a {\n`;
                styles += `    color: ${props.textColor.value};\n`;
                styles += `    text-decoration: none;\n`;
                styles += `    margin: 0 15px;\n`;
                styles += `    font-weight: 600;\n`;
                styles += `    transition: opacity 0.3s;\n`;
                styles += `}\n\n`;
                styles += `.element-${element.id} a:hover {\n`;
                styles += `    opacity: 0.7;\n`;
                styles += `}\n\n`;
                break;
        }

        if (styles) cssCode += styles;
    });

    // Aggiungi positioning agli elementi
    elements.forEach((element) => {
        if (element.position) {
            cssCode += `.element-${element.id} {\n`;
            cssCode += `    position: absolute;\n`;
            cssCode += `    top: ${element.position.top}px;\n`;
            cssCode += `    left: ${element.position.left}px;\n`;
            cssCode += `}\n\n`;
        }
    });

    cssCode += '/* RESPONSIVE */\n';
    cssCode += '@media (max-width: 768px) {\n';
    cssCode += '    .container {\n';
    cssCode += '        padding: 10px;\n';
    cssCode += '    }\n';
    cssCode += '}\n';

    // Genera JavaScript
    let jsCode = '// JavaScript per interattività\n\n';
    jsCode += 'document.addEventListener("DOMContentLoaded", function() {\n';
    jsCode += '    // Aggiungi qui la tua logica JavaScript personalizzata\n';
    jsCode += '    console.log("Pagina caricata con successo!");\n';
    jsCode += '\n';
    jsCode += '    // Esempio: Aggiungi evento ai bottoni\n';
    jsCode += '    const buttons = document.querySelectorAll("button");\n';
    jsCode += '    buttons.forEach(button => {\n';
    jsCode += '        button.addEventListener("click", function() {\n';
    jsCode += '            console.log("Bottone cliccato:", this.textContent);\n';
    jsCode += '        });\n';
    jsCode += '    });\n';
    jsCode += '});\n';

    codeOutputHtml.textContent = htmlCode;
    codeOutputCss.textContent = cssCode;
    document.getElementById('code-output-js').textContent = jsCode;
}

// Genera codice elemento
function generateElementCode(element) {
    const props = element.properties;
    const classAttr = ` class="element-${element.id}"`;

    switch (element.type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            return `<${element.type}${classAttr}>${props.text.value}</${element.type}>\n`;

        case 'paragraph':
            return `<p${classAttr}>${props.text.value}</p>\n`;

        case 'button':
            return `<button${classAttr}>${props.text.value}</button>\n`;

        case 'box':
            return `<div${classAttr}>${props.text.value}</div>\n`;

        case 'image':
            return `<img${classAttr} src="${props.src.value}" alt="${props.alt.value}">\n`;

        case 'grid':
            const cols = parseInt(props.columns.value);
            const rows = parseInt(props.rows.value);
            let gridHtml = `<div${classAttr} class="grid-container">\n`;
            for (let i = 0; i < cols * rows; i++) {
                const cellKey = `${element.id}-cell-${i}`;
                const cellText = gridCellTexts[cellKey] || `Cella ${i + 1}`;
                gridHtml += `        <div class="grid-cell">${cellText}</div>\n`;
            }
            gridHtml += `</div>\n`;
            return gridHtml;

        case 'form':
            const isLoginForm = props.formType.value === 'login';
            let formHtml = `<form${classAttr} class="auth-form">\n`;

            if (isLoginForm) {
                formHtml += `        <h3>Accedi</h3>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="email-login">Email</label>\n`;
                formHtml += `            <input type="email" id="email-login" placeholder="nome@email.com">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="password-login">Password</label>\n`;
                formHtml += `            <input type="password" id="password-login" placeholder="••••••••">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <button type="submit">Accedi</button>\n`;
                formHtml += `        <p>Non hai un account? <a href="#">Registrati</a></p>\n`;
            } else {
                formHtml += `        <h3>Registrati</h3>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="name-register">Nome Completo</label>\n`;
                formHtml += `            <input type="text" id="name-register" placeholder="Mario Rossi">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="email-register">Email</label>\n`;
                formHtml += `            <input type="email" id="email-register" placeholder="nome@email.com">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="password-register">Password</label>\n`;
                formHtml += `            <input type="password" id="password-register" placeholder="••••••••">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <div class="form-group">\n`;
                formHtml += `            <label for="confirm-password">Conferma Password</label>\n`;
                formHtml += `            <input type="password" id="confirm-password" placeholder="••••••••">\n`;
                formHtml += `        </div>\n`;
                formHtml += `        <button type="submit">Registrati</button>\n`;
                formHtml += `        <p>Hai già un account? <a href="#">Accedi</a></p>\n`;
            }

            formHtml += `</form>\n`;
            return formHtml;

        case 'navbar':
            const links = props.links.value.split(',').map(link => `<a href="#">${link.trim()}</a>`).join('\n        ');
            let navHtml = `<nav${classAttr}>\n`;
            navHtml += `        <span>Logo</span>\n`;
            navHtml += `        ${links}\n`;
            navHtml += `</nav>\n`;
            return navHtml;

        default:
            return '';
    }
}

// Funzione per editare le celle della griglia
function editGridCell(cellElement) {
    const cellId = cellElement.getAttribute('data-cell-id');
    const currentText = cellElement.textContent;

    const newText = prompt('Modifica il testo della cella:', currentText);

    if (newText !== null && newText !== '') {
        gridCellTexts[cellId] = newText;
        cellElement.textContent = newText;
        renderCode();
    }
}

// Inizializzazione
renderDesigner();
renderProperties();
renderCode();
