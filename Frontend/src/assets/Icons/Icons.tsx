import {SELECT_FLIPTOKEN, SELECT_TOKEN_ARROWDOWN, SELECT_TOKEN_INFO, SELECT_TOKEN_COUNT, SELECT_TOKEN_COUNT_IN, COMPANY_LOGO_ICON, FOOTER_CURVE_PIN, SOLANA_ICON, TETHER_ICON, SOLANAINFOICON, GTRLESSTHANSYMBOL} from './IconsString'
import { COINFLIP_MAIN_LOGO } from './MainLogo'

// model props
type selectTokenArrowDownProps = {
    size?: string,
    color_hash: string,
    bgcolor_hash: string,
    className?: string
}

type selectTokenInfoProps = {
    size?: string,
    className?: string
}

type selectFlipTokenProps = {
    color?: string
    className?: string
}

type selectTokenCountProps = {
    size?: string
    className?: string
}

type selectTokenCountInProps = {
    size?: string
    className?: string
    color?: "light" | "dark"
}

type companyLogoIconProps = {
    width?: string
    height?: string
    className?: string
    color?: string
}

type coinFlipLogoIconProps = {
    className?: string
    color?: string
}

type footerCurvePinProps = {
    className?: string
}

type solanaIconProps = {
    className?: string
    size?: string
}

type tetherIconProps = {
    className?: string
    size?: string
}

type gtrlessthanProps = {
    rev? : boolean;
    active? : boolean;
}

//Icon resolvers
export const SelctArrowDown = (props: selectTokenArrowDownProps) => {
    const ReplacementObjectValue:any = {
        "{STROKECOLOR}": props.color_hash,
        "{BGCOLOR}": props.bgcolor_hash,
        "{SIZE}": props.size ? props.size : "56"
    }
    const ProcessHtmlstr = SELECT_TOKEN_ARROWDOWN.replace(/{SIZE}|{BGCOLOR}|{STROKECOLOR}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className} cursor-pointer hover:opacity-90`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const SelctTokeninfo = (props: selectTokenInfoProps) => {
    const ReplacementObjectValue:any = {
        "{SIZE}": props.size ? props.size : "20"
    }
    const ProcessHtmlstr = SELECT_TOKEN_INFO.replace(/{SIZE}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className} cursor-pointer hover:opacity-90`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const SelectFlipToken = (props: selectFlipTokenProps) => {
    const ReplacementObjectValue:any = {
        "{COLOR}": props.color ? props.color : "#DC1FFF"
    }
    const ProcessHtmlstr = SELECT_FLIPTOKEN.replace(/{COLOR}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className} absolute bottom-0`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const SelectTokenCount = (props: selectTokenCountProps) => {
    const ReplacementObjectValue:any = {
        "{SIZE}": props.size ? props.size : "46"
    }
    const ProcessHtmlstr = SELECT_TOKEN_COUNT.replace(/{SIZE}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const SelectTokenCountIn = (props: selectTokenCountInProps) => {
    const ReplacementObjectValue:any = {
        "{SIZE}": props.size ? props.size : "22",
        "{COLOR}": props.color == 'light' ? "#121212" : "#fff" 
    }
    const ProcessHtmlstr = SELECT_TOKEN_COUNT_IN.replace(/{SIZE}|{COLOR}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const CompanyLogoIcon = (props: companyLogoIconProps) => {
    const ReplacementObjectValue:any = {
        "{WIDTH}": props.width ? props.width : "157",
        "{COLOR}": props.color ? props.color : "#fff",
        "{HEIGHT}": props.height ? props.height : "160"
    }
    const ProcessHtmlstr = COMPANY_LOGO_ICON.replace(/{WIDTH}|{COLOR}|{HEIGHT}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const CoinFlipLogoIcon = (props: coinFlipLogoIconProps) => {
    const ReplacementObjectValue:any = {
        "{COLOR}": props.color == 'light' ? "#121212" : "#fff",
    }
    const ProcessHtmlstr = COINFLIP_MAIN_LOGO.replace(/{COLOR}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const FooterCurvePinIcon = (props: footerCurvePinProps) => {
    const ReplacementObjectValue:any = {
        
    }
    const ProcessHtmlstr = FOOTER_CURVE_PIN.replace(/""/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div> 
}

export const SolanaIcon = (props: solanaIconProps) => {
    const ReplacementObjectValue:any = {
        "{SIZE}": props.size ? props.size : "40",
    }
    const ProcessHtmlstr = SOLANA_ICON.replace(/{SIZE}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const TetherIcon = (props: tetherIconProps) => {
    const ReplacementObjectValue:any = {
        "{SIZE}": props.size ? props.size : "40",
    }
    const ProcessHtmlstr = TETHER_ICON.replace(/{SIZE}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div className={`${props.className}`} dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}

export const SolanaInfoIcon = () => {
    return <div className='w-6 h-6 mr-1' dangerouslySetInnerHTML={{__html: SOLANAINFOICON}}></div> 
}

export const ForwordNdBackword = (props: gtrlessthanProps) => {
    const ReplacementObjectValue:any = {
        "{COLOR}": props.active ? "#FA4F00" : "currentColor",
        "{REV}": props.rev ? "-1": "1"
    }
    const ProcessHtmlstr = GTRLESSTHANSYMBOL.replace(/{REV}|{COLOR}/gi, (matched):string => {
        return ReplacementObjectValue[matched];
    })

    return <div dangerouslySetInnerHTML={{__html: ProcessHtmlstr}}></div>
}