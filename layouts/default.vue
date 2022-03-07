<template>
    <div style=" position: relative;">
        <Header/>
        <div style="min-height: 800px;">
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
        </div>
        <Footer/>
    </div>
</template>