import { createTheme } from '@mui/material/styles';

// Variáveis base do sistema de design (inspirado no modelo Obsidian Baseline)
const cores = {
    fundoBase: '#F5F7F5', // Fundo principal da aplicação
    fundoPainel: '#FFFFFF', // Fundo de áreas de conteúdo/cards
    textoPrincipal: '#1A1A1A',
    textoSecundario: '#404040',
    acaoPrimaria: '#46E055',
    acaoSecundaria: '#46E0BE',
    sinalizacao: '#B4E046',
    divisor: 'rgba(0, 0, 0, 0.08)',
    textoSobreDestaque: '#111111', // Para acessibilidade em botões primários
};

const temaBase = createTheme({
    spacing: 4, // Define o multiplicador base de espaçamento (1 = 4px). Ex: spacing(2) = 8px, spacing(4) = 16px.
    palette: {
        mode: 'light',
        primary: {
            main: cores.acaoPrimaria,
            contrastText: cores.textoSobreDestaque, // Garante legibilidade sobre o verde vibrante
        },
        secondary: {
            main: cores.acaoSecundaria,
            contrastText: cores.textoSobreDestaque,
        },
        info: {
            main: cores.sinalizacao,
            contrastText: cores.textoSobreDestaque,
        },
        background: {
            default: cores.fundoBase,
            paper: cores.fundoPainel,
        },
        text: {
            primary: cores.textoPrincipal,
            secondary: cores.textoSecundario,
        },
        divider: cores.divisor,
        custom: {
            hoverRow: 'rgba(70, 224, 85, 0.08)', // Estado de interação sutil
        }
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        // Fonte monoespaçada para tabelas de dados e números (facilita alinhamento)
        monospace: {
            fontFamily: '"Fira Code", "Courier New", monospace',
        },
        h1: {
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '-0.02em',
            marginBottom: '32px', // --size-4-6
        },
        h2: {
            fontWeight: 700,
            fontSize: '1.5rem',
            letterSpacing: '-0.01em',
            marginBottom: '24px', // --size-4-5
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.25rem',
            marginBottom: '16px', // --size-4-4
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
    },
    shape: {
        borderRadius: 16, // --radius-l para painéis e cards
    },
});

// Sobrescrita de componentes utilizando as variáveis do sistema
const theme = createTheme(temaBase, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // --radius-s para componentes interativos
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '8px 16px', // Padding simétrico exato (--size-4-2 --size-4-4)
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(70, 224, 85, 0.2)', // Elevação interativa
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#3BC948', // Escurece levemente no hover
                    }
                }
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: temaBase.shape.borderRadius,
                    border: `1px solid ${temaBase.palette.divider}`, // Delimitação estrutural fina
                    backgroundColor: temaBase.palette.background.paper,
                    padding: temaBase.spacing(2), // Padding interno de 8px (base) que somado ao CardContent dá 24px
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: temaBase.spacing(4), // --size-4-4 (16px)
                    '&:last-child': {
                        paddingBottom: temaBase.spacing(4),
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '12px 16px', // --size-4-3 --size-4-4
                    borderBottom: `1px solid ${temaBase.palette.divider}`,
                },
                head: {
                    fontWeight: 700,
                    backgroundColor: temaBase.palette.background.default, // Separação do cabeçalho
                    color: temaBase.palette.text.secondary,
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                hover: {
                    '&:hover': {
                        backgroundColor: temaBase.palette.custom.hoverRow, // Destaque suave em tabelas
                    }
                }
            }
        }
    },
});

export default theme;
