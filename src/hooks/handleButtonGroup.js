const HeaderButtonGroup = ({onPreviousPage,onNextPage}) => {
    return(
        <>
            <button onClick = {onPreviousPage}>이전페이지</button>
            <button onClick = {onNextPage} > 다음페이지</button>
        </>    )
}

export default HeaderButtonGroup