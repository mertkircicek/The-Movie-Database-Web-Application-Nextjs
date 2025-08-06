// Bu dosyayı yeni Next.js projenizin src/Layouts/Container/ klasörüne yerleştirin.
// İçeriği olduğu gibi kalacaktır.

const Container = ({children}) => {
    return (
        <div className="w-full">
            {children}
        </div>
    );
};

export default Container;
