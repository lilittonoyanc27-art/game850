export interface PrepositionQuestion {
  id: string;
  prompt: string;
  choices: string[];
  target: string;
  translation: string;
}

export interface GenderException {
  id: string;
  word: string;
  gender: 'el' | 'la';
  isException: boolean;
  translation: string;
}

export interface AdjectivePluralQuestion {
  id: string;
  singular: string;
  pluralTarget: string;
  translation: string;
  adjective: string;
}

export const PREPOSITION_QUESTIONS: PrepositionQuestion[] = [
  { id: '1', prompt: 'Vivo ___ Madrid.', choices: ['en', 'de', 'a'], target: 'en', translation: 'Ես ապրում եմ Մադրիդում:' },
  { id: '2', prompt: 'Soy ___ Armenia.', choices: ['en', 'de', 'a'], target: 'de', translation: 'Ես Հայաստանից եմ:' },
  { id: '3', prompt: 'Voy ___ la escuela.', choices: ['en', 'de', 'a'], target: 'a', translation: 'Ես գնում եմ դպրոց:' },
  { id: '4', prompt: 'El libro está ___ la mesa.', choices: ['en', 'de', 'a'], target: 'en', translation: 'Գիրքը սեղանի վրա է:' },
  { id: '5', prompt: 'Vengo ___ casa.', choices: ['en', 'de', 'a'], target: 'de', translation: 'Ես գալիս եմ տնից:' },
  { id: '6', prompt: 'Mañana voy ___ París.', choices: ['en', 'de', 'a'], target: 'a', translation: 'Վաղը ես գնում եմ Փարիզ:' },
  { id: '7', prompt: 'Estamos ___ el restaurante.', choices: ['en', 'de', 'a'], target: 'en', translation: 'Մենք ռեստորանում ենք:' },
  { id: '8', prompt: 'Este regalo es ___ Juan.', choices: ['en', 'de', 'a'], target: 'de', translation: 'Այս նվերը Խուանից է (կամ Խուանի համար):' },
  { id: '9', prompt: 'Llegamos ___ las diez.', choices: ['en', 'de', 'a'], target: 'a', translation: 'Մենք ժամանում ենք ժամը տասին:' },
  { id: '10', prompt: '¿Qué hay ___ la caja?', choices: ['en', 'de', 'a'], target: 'en', translation: 'Ի՞նչ կա տուփի մեջ:' }
];

export const GENDER_EXCEPTIONS: GenderException[] = [
  { id: '1', word: 'Problema', gender: 'el', isException: true, translation: 'Խնդիր' },
  { id: '2', word: 'Mano', gender: 'la', isException: true, translation: 'Ձեռք' },
  { id: '3', word: 'Día', gender: 'el', isException: true, translation: 'Օր' },
  { id: '4', word: 'Casa', gender: 'la', isException: false, translation: 'Տուն' },
  { id: '5', word: 'Mapa', gender: 'el', isException: true, translation: 'Քարտեզ' },
  { id: '6', word: 'Libro', gender: 'el', isException: false, translation: 'Գիրք' },
  { id: '7', word: 'Sofa', gender: 'el', isException: true, translation: 'Բազմոց' },
  { id: '8', word: 'Radio', gender: 'la', isException: true, translation: 'Ռադիո' },
  { id: '9', word: 'Agua', gender: 'el', isException: true, translation: 'Ջուր (իգական է, բայց օգտագործվում է el)' },
  { id: '10', word: 'Foto', gender: 'la', isException: true, translation: 'Լուսանկար' }
];

export const ADJECTIVE_PLURAL_QUESTIONS: AdjectivePluralQuestion[] = [
  { id: '1', singular: 'El estudiante es inteligente.', pluralTarget: 'Los estudiantes son inteligentes.', adjective: 'inteligente', translation: 'Ուսանողը խելացի է:' },
  { id: '2', singular: 'La flor es azul.', pluralTarget: 'Las flores son azules.', adjective: 'azul', translation: 'Ծաղիկը կապույտ է:' },
  { id: '3', singular: 'El hombre es feliz.', pluralTarget: 'Los hombres son felices.', adjective: 'feliz', translation: 'Տղամարդը երջանիկ է:' },
  { id: '4', singular: 'La lección es fácil.', pluralTarget: 'Las lecciones son fáciles.', adjective: 'fácil', translation: 'Դասը հեշտ է:' },
  { id: '5', singular: 'El coche es grande.', pluralTarget: 'Los coches son grandes.', adjective: 'grande', translation: 'Մեքենան մեծ է:' },
  { id: '6', singular: 'La mujer es fuerte.', pluralTarget: 'Las mujeres son fuertes.', adjective: 'fuerte', translation: 'Կինը ուժեղ է:' },
  { id: '7', singular: 'El examen es difícil.', pluralTarget: 'Los exámenes son difíciles.', adjective: 'difícil', translation: 'Քննությունը դժվար է:' },
  { id: '8', singular: 'La puerta es verde.', pluralTarget: 'Las puertas son verdes.', adjective: 'verde', translation: 'Դուռը կանաչ է:' },
  { id: '9', singular: 'El joven es amable.', pluralTarget: 'Los jóvenes son amables.', adjective: 'amable', translation: 'Երիտասարդը բարեհամբույր է:' },
  { id: '10', singular: 'La fruta es dulce.', pluralTarget: 'Las frutas son dulces.', adjective: 'dulce', translation: 'Միրգը քաղցր է:' }
];
