const About = () => {
    return (
        <>
            <div>
                <h1 className="text-center mt-3">About Us</h1>
                <p className="text-center mx-5 px-5">
                    We are Snipp-it, a small company based in Smalltown Ohio
                    that believes in everyone being able to learn. This site is
                    based around sharing tutorials on how to do anything.
                    <br />
                    <br />
                    While we are for profit, this will remain an ad-free
                    experience as in our philosophy it gets in the way of the
                    user experience. However, donations are appreciated to keep
                    the site running.
                    <br />
                    <br />
                    We can be reached at our email{" "}
                    <a href="mailto:contact.us@snipp-it.com">
                        contact.us@snipp-it.com
                    </a>{" "}
                    and our phone number is:{" "}
                    <a href="tel:+15555555555">+1 (555)555-5555</a>{" "}
                </p>
            </div>
        </>
    );
};

export default About;
