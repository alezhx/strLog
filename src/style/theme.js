import { createMuiTheme } from '@material-ui/core';
import palette from './palette'

const theme = createMuiTheme({
    palette,
    typography: {
        fontFamily: 'Lato, sans-serif',
        fontSize: 14,
        appleFont: '-apple-system, BlinkMacSystemFont, sans-serif',
    },
    overrides: {
        MuiButton: {
            root: {
                lineHeight: 'normal',
            }
        },
        MuiSelect: {
            root: {
                fontSize: '1rem'
            }
        },
        MuiTableCell: {
            root: {
                fontSize: '1.125rem'
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: 'rgba(5,167,227,0.36)'
                }
            }
        },
        MuiTooltip: {
            tooltipPlacementTop: {
                minWidth: 'fit-content'
            }
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: 500
            }
        }
    }
})

export default theme;