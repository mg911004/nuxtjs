<template>
    <div style=" position: relative;">
        <Header/>
        <section class="section" style="min-height: 800px;">
            <div class="container">
                <div class="columns">
                    <div class="column is-3 is-hidden-touch">
                        <Leftmenu/>
                    </div>
                     <div class="column">
                        <Nuxt/>
                     </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>