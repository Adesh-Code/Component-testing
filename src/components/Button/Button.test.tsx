import { render, screen } from '@testing-library/react';
import Button from './Button';
import { ButtonVariants } from './../../types/types';
import userEvent from '@testing-library/user-event'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

let children = "Submit"

let allProps = {
    backgroundColor : "#fff",
    textColor : "#000",
    onPress : jest.fn(),
    leftIcon : faArrowRight, 
    rightIcon : faArrowRight, 
    isDisabled : true,
    isLoading : true,
    href : "/",
    title : children
}

describe("Button with No props", ()=> {

    let emptyProps = {}

    test("button without props", ()=>{
        render(<Button {...emptyProps}/>)
        expect(screen.queryByText(children)).toBeNull()
    })

})

describe("Button with required props", ()=> {

    let requiredProps = {
        backgroundColor : '#ffffff',
        textColor : '#ef0101',
        onPress : jest.fn(),
        title : children
    }

    test("button with required props", () => {
        render(<Button {...requiredProps}/>)
        expect(screen.getByText(children)).toBeInTheDocument()
    })

    test("button background", ()=> {
        render(<Button {...requiredProps}/>)
        expect(screen.getByTestId("generic-button")).toHaveStyle( `background-color: ${requiredProps.backgroundColor} ` )
    })

    test("button text color", ()=> {
        render(<Button {...requiredProps}/>)
        expect(screen.getByTestId("generic-button")).toHaveStyle( `color: ${requiredProps.textColor} ` )
    })

    test("button onClick", ()=> {
        render(<Button {...requiredProps}/>)
        const buttonElement = screen.getByTestId('generic-button')
        userEvent.click(buttonElement)
        expect(requiredProps.onPress).toHaveBeenCalled()
        expect(requiredProps.onPress).toHaveBeenCalledTimes(1)
    })

})

describe("Button with all props", ()=> {

    test("button with all props", () => {
        render(<Button {...allProps}/>)
        expect(screen.getByText(children)).toBeInTheDocument()
    })

    test("button loadingIcon", ()=> {
        render(<Button {...allProps}/>)
        expect(screen.getByTestId('loading-icon')).toBeInTheDocument()
    })
    
    test("button leftIcon", ()=> {
        render(<Button {...allProps}/>)
        expect(screen.getByTestId('left-arrow-icon')).toBeInTheDocument()
    })

    test("button rightIcon", ()=> {
        render(<Button {...allProps}/>)
        expect(screen.getByTestId('right-arrow-icon')).toBeInTheDocument()
    })
})

describe("Button States", ()=> {


    let requiredProps = {
        backgroundColor : '#ffffff',
        textColor : '#ef0101',
        onPress : jest.fn(),
        title : children
    }

    test("Normal", ()=> {
        render(<Button {...requiredProps}/>)
        const buttonElement = screen.getByTestId('generic-button')
        userEvent.click(buttonElement)
        expect(requiredProps.onPress).toHaveBeenCalled()
        expect(requiredProps.onPress).toHaveBeenCalledTimes(1)
        expect(buttonElement).toHaveStyle( `color: ${requiredProps.textColor} ` )
        expect(buttonElement).toHaveStyle( `background-color: ${requiredProps.backgroundColor} ` )
    })

    test("Pressed", ()=> {
        render(<Button {...requiredProps}/>)
        const buttonElement = screen.getByTestId('generic-button')
        userEvent.click(buttonElement)
        expect(requiredProps.onPress).toHaveBeenCalled()
        expect(requiredProps.onPress).toHaveBeenCalledTimes(1)
    })

    test("Disabled", ()=> {
        render(<Button isDisabled={true} {...requiredProps}/>)
        const buttonElement = screen.getByTestId('generic-button')
        userEvent.click(buttonElement)
        expect(requiredProps.onPress).toHaveBeenCalledTimes(0)
        expect(buttonElement).toHaveStyle( `color: #fff ` )
        expect(buttonElement).toHaveStyle( `background-color: #C6C6CB ` )
    })

})

describe("Button Sizes", ()=> {


    let requiredProps = {
        backgroundColor : '#ffffff',
        textColor : '#ef0101',
        onPress : jest.fn(),
        title : children
    }

    test("Width Block", ()=> {
        render(<Button width="full" {...requiredProps}/>)
        expect(screen.getByTestId("generic-button")).toHaveStyle( `width: full ` )
    })

})

describe("Button Variants", ()=> {


    let requiredProps = {
        backgroundColor : '#ffffff',
        textColor : '#ef0101',
        onPress : jest.fn(),
        title : children
    }

    describe("Solid", ()=> {
        test("Solid Regular", ()=> {
            render(<Button variant={ButtonVariants.Solid} {...requiredProps}/>)
            const buttonElement = screen.getByTestId("generic-button")
            expect(buttonElement).toHaveStyle( `color: ${requiredProps.textColor} ` )
            expect(buttonElement).toHaveStyle( `background-color: ${requiredProps.backgroundColor} ` )
        })
        
        test("Solid Disabled", ()=> {
            render(<Button isDisabled={true} variant={ButtonVariants.Solid} {...requiredProps}/>)
            const buttonElement = screen.getByTestId("generic-button")
            expect(buttonElement).toHaveStyle( `color: #FFFFFF ` )
            expect(buttonElement).toHaveStyle( `background-color: #C6C6CB ` )
            userEvent.click(buttonElement)
            expect(requiredProps.onPress).toHaveBeenCalledTimes(0)
        })

    })

    describe("Outlined", ()=> {
        test("Outlined Regular", ()=> {
            render(<Button variant={ButtonVariants.Outlined} {...requiredProps}/>)
            const buttonElement = screen.getByTestId("generic-button")
            expect(buttonElement).toHaveStyle( `color: ${requiredProps.textColor} ` )
            expect(buttonElement).toHaveStyle( `background-color: transparent ` )
            expect(buttonElement).toHaveStyle( `border: 1px solid ${requiredProps.textColor} ` )
        })
        
        test("Outlined Disabled", ()=> {
            render(<Button isDisabled={true} variant={ButtonVariants.Outlined} {...requiredProps}/>)
            const buttonElement = screen.getByTestId("generic-button")
            expect(buttonElement).toHaveStyle( `color: #C6C6CB ` )
            expect(buttonElement).toHaveStyle( `background-color: transparent ` )
            expect(buttonElement).toHaveStyle( `border: 1px solid #c6c6cb ` )
            userEvent.click(buttonElement)
            expect(requiredProps.onPress).toHaveBeenCalledTimes(0)
        })
    })

    describe("Link", ()=> {
        test("Link Regular", ()=> {
            render(<Button variant={ButtonVariants.Link} {...requiredProps} href='/' />)
            const linkElement = screen.getByTestId("button-link")
            expect(linkElement).toHaveStyle( `color: ${requiredProps.textColor} ` )
            expect(linkElement).toHaveStyle( `background-color: transparent ` )
        })
        
        test("Link Disabled", ()=> {
            render(<Button isDisabled={true} variant={ButtonVariants.Link} {...requiredProps} href='/' />)
            const linkElement = screen.getByTestId("button-link")
            expect(linkElement).toHaveStyle( `color: #C6C6CB ` )
            expect(linkElement).toHaveStyle( `background-color: transparent ` )
            userEvent.click(linkElement)
            expect(requiredProps.onPress).toHaveBeenCalledTimes(0)
        })
    })

})
